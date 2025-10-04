import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from '@lit-labs/signals'
import { Terminal } from '@xterm/xterm'

@customElement('tbx-console')
export class Console extends SignalWatcher(LitElement) {
  private term?: Terminal

  render (): unknown {
    // Render a slot so light-DOM children (xterm nodes) display inside shadow DOM
    return html`<slot></slot>`
  }

  protected firstUpdated (): void {
    // Attach xterm to the host element (light DOM) so the global xterm.css applies
    this.term = new Terminal({
      cursorBlink: false,
      cursorStyle: 'bar',
      cursorInactiveStyle: 'none',
      theme: {}
    })
    this.term.open(this)
    this.term.blur()
    this.term.write('Hello from \x1B[1;3;31mToolboxUI\x1B[0m! \x1b[?25l')
  }
}
