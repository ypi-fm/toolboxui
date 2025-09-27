import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from '@lit-labs/signals'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import { marked } from 'marked'
import markedKatex, { MarkedKatexOptions } from 'marked-katex-extension'
import type { KatexOptions } from 'katex'

// KaTeX options.
const katexOptions: KatexOptions = {
  throwOnError: false,
  output: 'mathml',
  strict: 'warn'
}

// MarkedKaTeX options.
const options: MarkedKatexOptions = {
  ...katexOptions,
  // Allow parsing `$...$` without surrounding spaces
  nonStandard: false
}

// Configure Markdown with KaTeX.
marked.use(markedKatex(options))

@customElement('tbx-markdown')
export class Markdown extends SignalWatcher(LitElement) {
  render (): unknown {
    const script = this.querySelector('script[type="text/markdown"]')
    const src = (script?.textContent) as string
    return html`${unsafeHTML(marked.parse(src) as string)}`
  }
}
