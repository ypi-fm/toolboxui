import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('tbx-clock')
export class TbxClock extends LitElement {
  @property({ type: String })
    timezone: string = 'UTC'

  @state()
  private now: Date = new Date()

  private intervalId: ReturnType<typeof window.setInterval> | undefined

  static styles = css`
    :host {
      display: block;
      font-variant-numeric: tabular-nums;
    }

    span {
      display: block;
    }
  `

  connectedCallback (): void {
    super.connectedCallback()
    this.startTicking()
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()
    this.stopTicking()
  }

  private startTicking (): void {
    this.stopTicking()
    this.now = new Date()
    this.intervalId = window.setInterval(() => {
      this.now = new Date()
    }, 1000)
  }

  private stopTicking (): void {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  private static composeDateString (parts: Intl.DateTimeFormatPart[]): string {
    const getPart = (type: Intl.DateTimeFormatPartTypes): string => {
      const match = parts.find(part => part.type === type)
      return match?.value ?? ''
    }

    const weekday = getPart('weekday')
    const month = getPart('month')
    const day = getPart('day')
    const year = getPart('year')
    return `${weekday}, ${month} ${day} ${year}`
  }

  private resolveTimeZone (): { zone: string, label: string } {
    const trimmed = (this.timezone ?? '').trim()
    const zone = trimmed === '' ? 'UTC' : trimmed
    return { zone, label: zone }
  }

  private formatTime (date: Date): string {
    const { zone, label } = this.resolveTimeZone()
    try {
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: zone,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      const formattedDate = TbxClock.composeDateString(dateFormatter.formatToParts(date))
      const formattedTime = timeFormatter.format(date)
      return `${formattedDate} ${formattedTime} (${label})`
    } catch (err) {
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      const formattedDate = TbxClock.composeDateString(dateFormatter.formatToParts(date))
      const formattedTime = timeFormatter.format(date)
      return `${formattedDate} ${formattedTime} (${label})`
    }
  }

  render (): unknown {
    return html`<span>${this.formatTime(this.now)}</span>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tbx-clock': TbxClock
  }
}
