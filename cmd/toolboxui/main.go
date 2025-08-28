package main

import (
	"fmt"
	"io/fs"
	"net/http"
	"strings"

	"github.com/ypi-fm/toolboxui/web"
)

func main() {
	// Static assets
	assets := web.Sub()
	assetFS := http.FileServer(http.FS(assets))

	// Router
	mux := http.NewServeMux()

	// Find JS bundle
	matches, _ := fs.Glob(assets, "index-*.js")
	js := "index.js"
	if len(matches) > 0 {
		js = matches[0]
	}

	// Serve JS bundle
	mux.Handle("/assets/"+js, http.StripPrefix("/assets/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Long cache for hashed filename
		if strings.Contains(js, "-") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}
		assetFS.ServeHTTP(w, r)
	})))

	// Example: Root just serves a fixed HTML string referencing index.js
	indexHTML := "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><script type=\"module\" src=\"/assets/" + js + "\" defer></script><title>ToolboxUI</title><body><h1>ToolboxUI</h1><test-element name=\"ToolboxUI\"></test-element></body>"
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Write([]byte(indexHTML))
	})

	// Serve
	if err := http.ListenAndServe(":8081", mux); err != nil {
		fmt.Println("Server error:", err)
	}
}
