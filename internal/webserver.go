package internal

import (
	"io/fs"
	"net/http"
	"path"
	"strings"
)

// WebServer wires HTTP handlers for the toolbox UI using compiled index HTML.
func WebServer(assets fs.FS, indexHTML []byte, ws *WebSocket) http.Handler {
	assetFS := http.FileServer(http.FS(assets))

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

	if ws != nil {
		mux.Handle(ws.path(), ws)
	}

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		_, _ = w.Write(indexHTML)
	})

	return mux
}
