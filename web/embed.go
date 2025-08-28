package web

import (
	"embed"
	"io/fs"
)

//go:embed dist/*
var dist embed.FS

// returns /web/dist as an fs.FS
func Sub() fs.FS {
	s, _ := fs.Sub(dist, "dist")
	return s
}
