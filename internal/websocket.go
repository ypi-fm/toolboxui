package internal

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/coder/websocket"
)

const (
	defaultWebSocketPath      = "/ws"
	defaultServerSendInterval = 5 * time.Second
	writeTimeout              = 5 * time.Second
)

// WebSocket exposes a simple demo WebSocket endpoint that streams timestamps
// to connected clients while logging any messages it receives.
type WebSocket struct {
	Path         string
	SendInterval time.Duration
	Logf         func(format string, args ...any)
}

func (ws *WebSocket) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	conn, err := websocket.Accept(w, r, nil)
	if err != nil {
		ws.logf("websocket accept error: %v", err)
		return
	}
	defer func() {
		if closeErr := conn.Close(websocket.StatusNormalClosure, ""); closeErr != nil {
			ws.logf("websocket close error: %v", closeErr)
		}
	}()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go ws.writeLoop(ctx, cancel, conn)

	for {
		_, payload, err := conn.Read(ctx)
		if err != nil {
			status := websocket.CloseStatus(err)
			switch status {
			case websocket.StatusNormalClosure, websocket.StatusGoingAway:
				ws.logf("websocket client closed connection (%d)", status)
			default:
				ws.logf("websocket read error: %v", err)
			}
			return
		}

		ws.logf("websocket received client timestamp: %s", string(payload))
	}
}

func (ws *WebSocket) writeLoop(ctx context.Context, cancel context.CancelFunc, conn *websocket.Conn) {
	ticker := time.NewTicker(ws.interval())
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case now := <-ticker.C:
			timestamp := now.UTC().Format(time.RFC3339Nano)
			ws.logf("websocket sending server timestamp: %s", timestamp)

			writeCtx, writeCancel := context.WithTimeout(ctx, writeTimeout)
			err := conn.Write(writeCtx, websocket.MessageText, []byte(timestamp))
			writeCancel()
			if err != nil {
				ws.logf("websocket write error: %v", err)
				cancel()
				return
			}
		}
	}
}

func (ws *WebSocket) interval() time.Duration {
	if ws.SendInterval <= 0 {
		return defaultServerSendInterval
	}
	return ws.SendInterval
}

func (ws *WebSocket) path() string {
	if ws.Path == "" {
		return defaultWebSocketPath
	}
	return ws.Path
}

func (ws *WebSocket) logf(format string, args ...any) {
	if ws.Logf != nil {
		ws.Logf(format, args...)
		return
	}
	log.Printf(format, args...)
}
