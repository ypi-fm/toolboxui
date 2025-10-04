const websocketPath = '/ws'
const clientPingIntervalMs = 5_000

declare global {
  interface Window {
    __TOOLBOX_WS_URL__?: string
    __TOOLBOX_WS_PORT__?: string
  }
}

function resolveWebSocketURL (path: string): string {
  if (typeof window.__TOOLBOX_WS_URL__ === 'string' && window.__TOOLBOX_WS_URL__ !== '') {
    return window.__TOOLBOX_WS_URL__
  }

  const url = new URL(window.location.href)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  url.pathname = path
  url.search = ''
  url.hash = ''

  if (typeof window.__TOOLBOX_WS_PORT__ === 'string' && window.__TOOLBOX_WS_PORT__ !== '') {
    url.port = window.__TOOLBOX_WS_PORT__
  }

  return url.toString()
}

function scheduleClientPing (socket: WebSocket): number {
  const sendTimestamp = (): void => {
    const now = new Date().toISOString()
    console.log(`[ws] client timestamp → server: ${now}`)
    socket.send(now)
  }

  sendTimestamp()
  return window.setInterval(sendTimestamp, clientPingIntervalMs)
}

function startWebSocketDemo (): void {
  const socket = new WebSocket(resolveWebSocketURL(websocketPath))

  let pingTimer: number | undefined

  socket.addEventListener('open', () => {
    console.log('[ws] connection opened')
    pingTimer = scheduleClientPing(socket)
  })

  socket.addEventListener('message', (event: MessageEvent<string>) => {
    console.log(`[ws] server timestamp → client: ${event.data}`)
  })

  socket.addEventListener('close', (event) => {
    if (typeof pingTimer === 'number') {
      clearInterval(pingTimer)
      pingTimer = undefined
    }
    console.log(`[ws] connection closed (code=${event.code}, reason="${event.reason}")`)
  })

  socket.addEventListener('error', (event) => {
    console.error('[ws] connection error', event)
  })
}

startWebSocketDemo()
