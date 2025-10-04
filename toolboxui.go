package toolboxui

import (
	"net/http"
	"time"

	"github.com/ypi-fm/toolboxui/internal"
	"github.com/ypi-fm/toolboxui/web"
)

const defaultAddr = ":8080"

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

	indexHTML, err := internal.Compiler(assets)
	if err != nil {
		return err
	}

	ws := &internal.WebSocket{
		Path:         "/ws",
		SendInterval: 5 * time.Second,
	}

	return http.ListenAndServe(addr, internal.WebServer(assets, indexHTML, ws))
}
