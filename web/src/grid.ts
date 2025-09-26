import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from '@lit-labs/signals'

@customElement('tbx-grid')
export class Grid extends SignalWatcher(LitElement) {
  render (): unknown {
    return html`<p>Grid</p>`
  }
}
