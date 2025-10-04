package internal

import (
	"bytes"
	"html/template"
	"io/fs"

	"github.com/ypi-fm/toolboxui/web"
)

// Compiler renders the index template to static HTML using asset filenames.
func Compiler(assets fs.FS) ([]byte, error) {
	js := "index.js"
	if matches, err := fs.Glob(assets, "index-*.js"); err == nil && len(matches) > 0 {
		js = matches[0]
	}

	css := "index.css"
	if matches, err := fs.Glob(assets, "index-*.css"); err == nil && len(matches) > 0 {
		css = matches[0]
	}

	tmpl, err := template.ParseFS(web.TemplatesSub(), "index.html")
	if err != nil {
		return nil, err
	}

	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, map[string]string{
		"JS":  "/assets/" + js,
		"CSS": "/assets/" + css,
	}); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
