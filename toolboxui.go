package toolboxui

import (
	"bytes"
	"html/template"
	"io/fs"
	"net/http"
	"path"
	"strings"

	"github.com/ypi-fm/toolboxui/web"
)

const defaultAddr = ":8081"

// ToolboxUI serves the toolbox web UI over HTTP.
type ToolboxUI struct {
	Addr string
}

// Start launches the HTTP server and blocks until it exits.
func (t *ToolboxUI) Start() error {
	addr := t.Addr
	if addr == "" {
		addr = defaultAddr
	}

	assets := web.DistSub()
	assetFS := http.FileServer(http.FS(assets))

	js := "index.js"
	if matches, _ := fs.Glob(assets, "index-*.js"); len(matches) > 0 {
		js = matches[0]
	}

	css := "index.css"
	if matches, _ := fs.Glob(assets, "index-*.css"); len(matches) > 0 {
		css = matches[0]
	}

	tmpl := template.Must(template.ParseFS(web.TemplatesSub(), "index.html"))
	var buf bytes.Buffer
	_ = tmpl.Execute(&buf, map[string]string{
		"JS":  "/assets/" + js,
		"CSS": "/assets/" + css,
	})
	indexHTML := buf.Bytes()

	mux := http.NewServeMux()
	mux.Handle("/assets/", http.StripPrefix("/assets/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		name := path.Base(r.URL.Path)
		if strings.Contains(name, "-") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		assetFS.ServeHTTP(w, r)
	})))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		_, _ = w.Write(indexHTML)
	})

	return http.ListenAndServe(addr, mux)
}
