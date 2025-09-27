package main

import (
	"bytes"
	"fmt"
	"html/template"
	"io/fs"
	"net/http"
	"path"
	"strings"

	"github.com/ypi-fm/toolboxui/web"
)

func main() {
	// Static assets and file server
	assets := web.DistSub()
	assetFS := http.FileServer(http.FS(assets))

	// Pick JS bundle (prefer hashed build)
	js := "index.js"
	if m, _ := fs.Glob(assets, "index-*.js"); len(m) > 0 {
		js = m[0]
	}

	// Pick CSS bundle (prefer hashed build)
	css := "index.css"
	if m, _ := fs.Glob(assets, "index-*.css"); len(m) > 0 {
		css = m[0]
	}

	// Parse and pre-render index template
	tmpl := template.Must(template.ParseFS(web.TemplatesSub(), "index.html"))
	var buf bytes.Buffer
	_ = tmpl.Execute(&buf, map[string]string{
		"JS":  "/assets/" + js,
		"CSS": "/assets/" + css,
	})
	indexHTML := buf.Bytes()

	// Router
	mux := http.NewServeMux()

	// Assets: inline cache policy
	// - Hashed filenames (e.g., index-<hash>.js) get long, immutable cache
	// - Others default to no-cache to always revalidate
	mux.Handle("/assets/", http.StripPrefix("/assets/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		name := path.Base(r.URL.Path)
		if strings.Contains(name, "-") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		assetFS.ServeHTTP(w, r)
	})))

	// Root: Serve pre-rendered HTML for each request
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		_, _ = w.Write(indexHTML)
	})

	// Serve
	if err := http.ListenAndServe(":8081", mux); err != nil {
		fmt.Println("Server error:", err)
	}
}
