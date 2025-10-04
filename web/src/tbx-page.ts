import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PropertyValueMap, TemplateResult } from 'lit'

function normalizeRoute (input: string | null | undefined): string {
  if (input == null || input.trim() === '') return '/'
  let route = input.trim()
  if (!route.startsWith('/')) {
    route = `/${route}`
  }
  if (route.length > 1 && route.endsWith('/')) {
    route = route.replace(/\/+/g, '/')
    route = route.replace(/\/+$/, '')
    if (route === '') {
      route = '/'
    }
  }
  return route
}

function normalizeTitle (input: string | null | undefined): string {
  if (input == null) return ''
  return input.trim()
}

function normalizeIcon (input: string | null | undefined): string {
  if (input == null) return ''
  return input.trim()
}

@customElement('tbx-page')
export class TbxPage extends LitElement {
  @property({ type: String, reflect: true })
    title: string = ''

  @property({ type: String, reflect: true })
    route: string = '/'

  @property({ type: String, reflect: true })
    icon: string = ''

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([inert]) {
      pointer-events: none;
    }

    ::slotted(*) {
      max-width: 100%;
      box-sizing: border-box;
    }

    ::slotted(tbx-chart),
    ::slotted(tbx-grid),
    ::slotted(tbx-clock),
    ::slotted(tbx-form),
    ::slotted(tbx-markdown),
    ::slotted(tbx-console) {
      display: block;
      width: 100%;
      max-width: 100%;
    }

    ::slotted(pre),
    ::slotted(code),
    ::slotted(table),
    ::slotted(tbx-console) {
      overflow-x: auto;
    }
  `

  protected willUpdate (changed: PropertyValueMap<this>): void {
    if (changed.has('route')) {
      const normalized = normalizeRoute(this.route)
      if (normalized !== this.route) {
        this.route = normalized
      }
    }

    if (changed.has('title')) {
      const normalizedTitle = normalizeTitle(this.title)
      if (normalizedTitle !== this.title) {
        this.title = normalizedTitle
      }
    }

    if (changed.has('icon')) {
      const normalizedIcon = normalizeIcon(this.icon)
      if (normalizedIcon !== this.icon) {
        this.icon = normalizedIcon
      }
    }
  }

  protected render (): TemplateResult {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tbx-page': TbxPage
  }
}
