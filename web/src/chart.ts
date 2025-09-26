import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from '@lit-labs/signals'

@customElement('tbx-chart')
export class Terminal extends SignalWatcher(LitElement) {
  render (): unknown {
    return html`<p>Chart</p>`
  }
}
