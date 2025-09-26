import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SignalWatcher } from '@lit-labs/signals'
import { clock } from './controllers'

@customElement('tbx-testelement')
export class TestElement extends SignalWatcher(LitElement) {
  @property()
    name?: string

  static styles = css`
    p {
      color: darkblue;
    }
  `

  render (): unknown {
    const formattedTime = timeFormat.format(clock.get())
    return html`<p>Hello ${this.name}! The time is ${formattedTime}.</p>`
  }
}

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: 'numeric', second: 'numeric'
})
