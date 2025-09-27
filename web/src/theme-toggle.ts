import '@shoelace-style/shoelace/dist/components/switch/switch.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'

type ThemeName = 'light' | 'dark'

const THEME_STORAGE_KEY = 'tbx-theme'
const DARK_CLASS = 'sl-theme-dark'
const LIGHT_CLASS = 'sl-theme-light'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function defineElement (tagName: string) {
  return <T extends CustomElementConstructor>(constructor: T): void => {
    if (customElements.get(tagName) == null) {
      customElements.define(tagName, constructor)
    }
  }
}

const listeners = new Set<(theme: ThemeName) => void>()

let currentTheme: ThemeName = 'light'
let hasStoredPreference = false

function isBrowser (): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function applyThemeClass (theme: ThemeName): void {
  if (!isBrowser()) return
  const root = document.documentElement
  root.classList.toggle(DARK_CLASS, theme === 'dark')
  root.classList.toggle(LIGHT_CLASS, theme === 'light')
  root.style.colorScheme = theme
}

function notify (theme: ThemeName): void {
  listeners.forEach(listener => listener(theme))
}

function readStoredTheme (): ThemeName | null {
  if (!isBrowser()) return null
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // ignore storage errors (private mode, etc.)
  }
  return null
}

function writeStoredTheme (theme: ThemeName): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore storage errors
  }
}

function resolvePreferredTheme (): ThemeName {
  const stored = readStoredTheme()
  if (stored !== null) {
    hasStoredPreference = true
    return stored
  }

  if (isBrowser() && window.matchMedia(DARK_QUERY).matches) {
    return 'dark'
  }

  return 'light'
}

export function getCurrentTheme (): ThemeName {
  return currentTheme
}

export function setTheme (theme: ThemeName, persist = true): void {
  const changed = currentTheme !== theme
  currentTheme = theme
  applyThemeClass(theme)
  if (persist) {
    hasStoredPreference = true
    writeStoredTheme(theme)
  }
  if (changed) {
    notify(theme)
  }
}

export function onThemeChange (listener: (theme: ThemeName) => void): () => void {
  listeners.add(listener)
  listener(currentTheme)
  return () => listeners.delete(listener)
}

function initThemeController (): void {
  if (!isBrowser()) return

  currentTheme = resolvePreferredTheme()
  applyThemeClass(currentTheme)

  const media = window.matchMedia(DARK_QUERY)
  const handleMediaChange = (event: MediaQueryListEvent): void => {
    if (hasStoredPreference) return
    const theme = event.matches ? 'dark' : 'light'
    if (theme !== currentTheme) {
      currentTheme = theme
      applyThemeClass(currentTheme)
      notify(currentTheme)
    }
  }

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', handleMediaChange)
  } else if (typeof media.addListener === 'function') {
    media.addListener(handleMediaChange)
  }
}

initThemeController()

interface SwitchControl extends HTMLElement {
  checked: boolean
}

interface IconControl extends HTMLElement {}

@defineElement('tbx-theme-toggle')
export class ThemeToggleElement extends HTMLElement {
  private switchEl: SwitchControl | null = null
  private iconEl: IconControl | null = null
  private unsubscribe: (() => void) | null = null

  connectedCallback (): void {
    if (this.shadowRoot == null) {
      this.attachShadow({ mode: 'open' })
      this.render()
    }

    const root = this.shadowRoot
    if (root == null) return

    this.switchEl = root.querySelector('sl-switch') as SwitchControl | null
    this.iconEl = root.querySelector('sl-icon') as IconControl | null

    if (this.switchEl != null) {
      this.switchEl.addEventListener('sl-change', this.handleToggle)
    }

    this.unsubscribe = onThemeChange(theme => {
      this.updateUI(theme)
    })
  }

  disconnectedCallback (): void {
    if (this.switchEl != null) {
      this.switchEl.removeEventListener('sl-change', this.handleToggle)
    }
    if (this.unsubscribe != null) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  private readonly handleToggle = (event: Event): void => {
    const target = event.currentTarget as SwitchControl
    const theme: ThemeName = target.checked ? 'dark' : 'light'
    setTheme(theme)
  }

  private updateUI (theme: ThemeName): void {
    const checked = theme === 'dark'
    const switchControl = this.switchEl
    const iconControl = this.iconEl

    if ((switchControl != null) && switchControl.checked !== checked) {
      switchControl.checked = checked
    }

    if (switchControl != null) {
      switchControl.setAttribute('aria-label', checked ? 'Activate light mode' : 'Activate dark mode')
    }

    if (iconControl != null) {
      iconControl.setAttribute('name', checked ? 'moon' : 'sun')
    }
  }

  private render (): void {
    const root = this.shadowRoot
    if (root == null) return

    root.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
        }

        sl-icon {
          margin-inline-start: 0.5rem;
          font-size: 1.2rem;
        }
      </style>
      <sl-switch size="small"></sl-switch>
      <sl-icon name="sun"></sl-icon>
    `
  }
}
