package web

import (
	"embed"
	"io/fs"
)

// Embed built frontend assets
//
//go:embed dist/*
var dist embed.FS

// Embed HTML templates
//
//go:embed templates/*
var templates embed.FS

// returns /web/dist as an fs.FS
func DistSub() fs.FS {
	s, _ := fs.Sub(dist, "dist")
	return s
}

// returns /web/templates as an fs.FS
func TemplatesSub() fs.FS {
	s, _ := fs.Sub(templates, "templates")
	return s
}
