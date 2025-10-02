import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import type { PropertyValueMap } from 'lit'
import { SignalWatcher } from '@lit-labs/signals'
import { TabulatorFull } from 'tabulator-tables'
import type { ColumnDefinition, Options } from 'tabulator-tables'
import { getCurrentTheme, onThemeChange, type ThemeName } from './theme-toggle'

type GridRow = Record<string, unknown>

const DEFAULT_DATA: GridRow[] = [
  { id: 1, name: 'Oli Bob', progress: 42, gender: 'Male', rating: 4, driver: true, location: 'Brighton', birthday: '1984-04-14' },
  { id: 2, name: 'Mary May', progress: 68, gender: 'Female', rating: 5, driver: true, location: 'London', birthday: '1986-05-21' },
  { id: 3, name: 'Christine Lobowski', progress: 15, gender: 'Female', rating: 3, driver: false, location: 'Manchester', birthday: '1992-02-22' },
  { id: 4, name: 'Brendon Philips', progress: 82, gender: 'Male', rating: 4, driver: true, location: 'Bristol', birthday: '1990-07-14' },
  { id: 5, name: 'Margret Marmajuke', progress: 33, gender: 'Female', rating: 2, driver: false, location: 'Newcastle', birthday: '1999-02-11' },
  { id: 6, name: 'Van Ng', progress: 54, gender: 'Male', rating: 4, driver: true, location: 'Cardiff', birthday: '1997-06-09' }
]

const DEFAULT_COLUMNS: ColumnDefinition[] = [
  { title: 'Name', field: 'name', frozen: true, widthGrow: 1.4, minWidth: 150 },
  {
    title: 'Progress',
    field: 'progress',
    formatter: 'progress',
    sorter: 'number',
    hozAlign: 'left',
    formatterParams: { color: 'var(--tbx-grid-accent)' },
    widthGrow: 1,
    minWidth: 120
  },
  { title: 'Gender', field: 'gender', sorter: 'string', widthGrow: 0.9, minWidth: 110 },
  { title: 'Rating', field: 'rating', formatter: 'star', hozAlign: 'center', widthGrow: 1, minWidth: 130 },
  { title: 'Driver', field: 'driver', formatter: 'tickCross', hozAlign: 'center', widthGrow: 0.8, minWidth: 110 },
  { title: 'Location', field: 'location', widthGrow: 1.1, minWidth: 140 },
  { title: 'Birthday', field: 'birthday', sorter: 'date', hozAlign: 'center', widthGrow: 1, minWidth: 140 }
]

const BASE_OPTIONS: Partial<Options> = {
  layout: 'fitColumns',
  responsiveLayout: false
}

const BASE_COLUMN_DEFAULTS: Partial<ColumnDefinition> = {
  minWidth: 120,
  resizable: true,
  hozAlign: 'left'
}

const scheduleFrame: (callback: FrameRequestCallback) => void =
  typeof globalThis !== 'undefined' && typeof globalThis.requestAnimationFrame === 'function'
    ? globalThis.requestAnimationFrame.bind(globalThis)
    : (callback: FrameRequestCallback) => {
        setTimeout(() => {
          const timestamp = typeof performance !== 'undefined' ? performance.now() : Date.now()
          callback(timestamp)
        }, 16)
      }

const COMPONENT_STYLES = css`
  :host {
    display: block;
    color: inherit;
    contain: content;
    --tbx-grid-font-size: 0.95rem;
    --tbx-grid-radius: 0.75rem;
    --tbx-grid-surface: #ffffff;
    --tbx-grid-surface-alt: #f9fafb;
    --tbx-grid-header-bg: #f3f4f6;
    --tbx-grid-header-text: #1f2937;
    --tbx-grid-text: #111827;
    --tbx-grid-muted: #4b5563;
    --tbx-grid-border: #e5e7eb;
    --tbx-grid-border-strong: #d1d5db;
    --tbx-grid-row-hover: rgba(37, 99, 235, 0.08);
    --tbx-grid-row-selected: rgba(37, 99, 235, 0.18);
    --tbx-grid-accent: #2563eb;
    --tbx-grid-tick: #16a34a;
    --tbx-grid-cross: #dc2626;
    --tbx-grid-star-active: #fbbf24;
    --tbx-grid-star-stroke: #b45309;
    --tbx-grid-star-inactive: #d1d5db;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([data-theme='dark']) {
    --tbx-grid-surface: #14161b;
    --tbx-grid-surface-alt: #1b1d23;
    --tbx-grid-header-bg: #1f2128;
    --tbx-grid-header-text: #f4f6fb;
    --tbx-grid-text: #e2e5ed;
    --tbx-grid-muted: #9ca3b5;
    --tbx-grid-border: #30333c;
    --tbx-grid-border-strong: #3d404b;
    --tbx-grid-row-hover: rgba(148, 163, 184, 0.12);
    --tbx-grid-row-selected: rgba(96, 165, 250, 0.18);
    --tbx-grid-accent: #60a5fa;
    --tbx-grid-tick: #34d399;
    --tbx-grid-cross: #f87171;
    --tbx-grid-star-active: #facc15;
    --tbx-grid-star-stroke: #f59e0b;
    --tbx-grid-star-inactive: #4b5563;
  }

  #grid {
    width: 100%;
    min-height: 240px;
    font-family: inherit;
  }

  .tabulator,
  .tabulator * {
    box-sizing: border-box;
  }

  .tabulator {
    background-color: var(--tbx-grid-surface);
    color: var(--tbx-grid-text);
    border: 1px solid var(--tbx-grid-border);
    border-radius: var(--tbx-grid-radius);
    font-family: inherit;
    font-size: var(--tbx-grid-font-size);
    overflow: hidden;
    position: relative;
    text-align: left;
  }

  .tabulator .tabulator-header {
    background-color: var(--tbx-grid-header-bg);
    color: var(--tbx-grid-header-text);
    border-bottom: 1px solid var(--tbx-grid-border);
    position: relative;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
  }

  .tabulator .tabulator-header .tabulator-header-contents {
    overflow: hidden;
    position: relative;
  }

  .tabulator .tabulator-header .tabulator-headers {
    display: inline-flex;
  }

  .tabulator .tabulator-header .tabulator-col {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    border-right: 1px solid var(--tbx-grid-border);
    min-height: 2.1rem;
    max-width: 18rem;
    min-width: fit-content;
  }

  .tabulator .tabulator-header .tabulator-col.tabulator-frozen {
    background-color: var(--tbx-grid-header-bg);
    box-shadow: 1px 0 0 var(--tbx-grid-border);
    position: sticky;
    left: 0;
    z-index: 3;
  }

  .tabulator .tabulator-header .tabulator-col:last-of-type {
    border-right: none;
  }

  .tabulator .tabulator-header .tabulator-col .tabulator-col-content {
    padding: 0.28rem 0.5rem;
    position: relative;
  }

  .tabulator .tabulator-header .tabulator-col .tabulator-col-title {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1rem;
  }

  .tabulator .tabulator-header .tabulator-col .tabulator-col-sorter {
    align-items: center;
    display: flex;
    position: absolute;
    right: 0.28rem;
    top: 0;
    bottom: 0;
    width: 0.9rem;
  }

  .tabulator .tabulator-header .tabulator-col .tabulator-col-sorter .tabulator-arrow {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid var(--tbx-grid-muted);
    transition: transform 0.12s ease;
  }

  .tabulator .tabulator-header .tabulator-col[aria-sort='ascending'] .tabulator-arrow {
    transform: rotate(180deg);
  }

  .tabulator .tabulator-header .tabulator-col[aria-sort='ascending'] .tabulator-arrow,
  .tabulator .tabulator-header .tabulator-col[aria-sort='descending'] .tabulator-arrow {
    border-top-color: var(--tbx-grid-text);
  }

  .tabulator .tabulator-tableholder {
    position: relative;
    overflow: auto;
    background-color: var(--tbx-grid-surface);
    border-top: 1px solid var(--tbx-grid-border);
    border-bottom: 1px solid var(--tbx-grid-border);
  }

  .tabulator .tabulator-table {
    display: inline-block;
    min-width: max-content;
    background-color: inherit;
    color: inherit;
  }

  .tabulator .tabulator-row {
    background-color: var(--tbx-grid-surface);
    border-bottom: 1px solid var(--tbx-grid-border);
    transition: background-color 0.15s ease;
  }

  .tabulator .tabulator-row:nth-of-type(even) {
    background-color: var(--tbx-grid-surface-alt);
  }

  .tabulator .tabulator-row:hover {
    background-color: var(--tbx-grid-row-hover);
  }

  .tabulator .tabulator-row.tabulator-selected {
    background-color: var(--tbx-grid-row-selected);
  }

  .tabulator .tabulator-row .tabulator-cell {
    display: inline-flex;
    align-items: center;
    gap: 0.18rem;
    padding: 0.32rem 0.55rem;
    border-right: 1px solid var(--tbx-grid-border);
    background-color: inherit;
    color: inherit;
    min-height: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }

  .tabulator .tabulator-row .tabulator-cell:last-of-type {
    border-right: none;
  }

  .tabulator .tabulator-row .tabulator-cell .tabulator-data-tree-branch {
    border-color: var(--tbx-grid-border);
  }

  .tabulator .tabulator-row .tabulator-cell.tabulator-frozen {
    background-color: var(--tbx-grid-surface);
    box-shadow: 1px 0 0 var(--tbx-grid-border);
    position: sticky;
    left: 0;
    z-index: 2;
  }

  .tabulator .tabulator-row .tabulator-cell > div[data-max] {
    height: 0.45rem !important;
    border-radius: 999px;
    margin: 0.3rem 0;
    flex: 1 1 auto;
    width: 100%;
    background-color: var(--tbx-grid-accent);
  }

  .tabulator .tabulator-row .tabulator-cell > div[data-max] > div {
    height: 100% !important;
    border-radius: inherit;
  }

  .tabulator .tabulator-footer {
    background-color: var(--tbx-grid-surface-alt);
    border-top: 1px solid var(--tbx-grid-border);
    color: var(--tbx-grid-muted);
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
  }

  .tabulator svg path[fill='#2DC214'] {
    fill: var(--tbx-grid-tick);
  }

  .tabulator svg path[fill='#CE1515'] {
    fill: var(--tbx-grid-cross);
  }

  .tabulator svg polygon[fill='#FFEA00'] {
    fill: var(--tbx-grid-star-active);
  }

  .tabulator svg polygon[fill='#D2D2D2'] {
    fill: var(--tbx-grid-star-inactive);
  }

  .tabulator svg polygon[stroke='#C1AB60'] {
    stroke: var(--tbx-grid-star-stroke);
  }

  .tabulator svg polygon[stroke='#686868'] {
    stroke: var(--tbx-grid-border-strong);
  }
`

@customElement('tbx-grid')
export class Grid extends SignalWatcher(LitElement) {
  static override styles = COMPONENT_STYLES

  @property({ attribute: false })
    data: GridRow[] = DEFAULT_DATA

  @property({ attribute: false })
    columns: ColumnDefinition[] = DEFAULT_COLUMNS

  @property({ attribute: false })
    options: Partial<Options> | undefined

  @query('#grid')
  private readonly gridContainer!: HTMLDivElement

  private table: TabulatorFull | undefined
  private resizeObserver: ResizeObserver | undefined
  private unsubscribeTheme: (() => void) | undefined
  private redrawQueued = false
  private currentTheme: ThemeName = getCurrentTheme()

  public override connectedCallback (): void {
    super.connectedCallback()

    this.applyTheme(this.currentTheme)

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.queueRedraw()
      })
      this.resizeObserver.observe(this)
    }

    this.unsubscribeTheme = onThemeChange(theme => {
      if (this.applyTheme(theme)) {
        this.queueRedraw()
      }
    })
  }

  protected override firstUpdated (): void {
    this.initializeTable()
  }

  protected override updated (changed: PropertyValueMap<this>): void {
    super.updated(changed)

    if (this.table == null) {
      if (this.gridContainer != null) {
        this.initializeTable()
      }
      return
    }

    if (changed.has('options')) {
      this.initializeTable()
      return
    }

    if (changed.has('columns')) {
      this.syncColumns()
    }

    if (changed.has('data')) {
      void this.syncData()
    }
  }

  public override disconnectedCallback (): void {
    super.disconnectedCallback()
    this.resizeObserver?.disconnect()
    this.resizeObserver = undefined
    if (this.unsubscribeTheme != null) {
      this.unsubscribeTheme()
      this.unsubscribeTheme = undefined
    }
    this.destroyTable()
  }

  render (): unknown {
    return html`<div id="grid" part="grid"></div>`
  }

  private initializeTable (): void {
    if (this.gridContainer == null) {
      return
    }

    this.destroyTable()

    this.table = new TabulatorFull(this.gridContainer, this.composeOptions())
    this.queueRedraw()
  }

  private destroyTable (): void {
    if (this.table == null) {
      return
    }

    this.table.destroy()
    this.table = undefined
    this.gridContainer?.replaceChildren()
  }

  private composeOptions (): Options {
    const { data, columns, columnDefaults, ...rest } = this.options ?? {}
    const composed: Options = {
      ...BASE_OPTIONS,
      ...rest,
      columnDefaults: {
        ...BASE_COLUMN_DEFAULTS,
        ...(columnDefaults ?? {})
      },
      data: data ?? this.data,
      columns: (columns) ?? this.columns
    }
    return composed
  }

  private getResolvedData (): Options['data'] {
    return this.options?.data ?? this.data
  }

  private getResolvedColumns (): ColumnDefinition[] {
    return (this.options?.columns) ?? this.columns
  }

  private syncColumns (): void {
    if (this.table == null) {
      return
    }

    this.table.setColumns(this.getResolvedColumns())
    this.queueRedraw()
  }

  private async syncData (): Promise<void> {
    if (this.table == null) {
      return
    }

    await this.table.replaceData(this.getResolvedData())
    this.queueRedraw()
  }

  private queueRedraw (): void {
    if (this.table == null || this.redrawQueued) {
      return
    }

    this.redrawQueued = true
    scheduleFrame(() => {
      this.redrawQueued = false
      this.table?.redraw(true)
    })
  }

  private applyTheme (theme: ThemeName): boolean {
    const changed = this.currentTheme !== theme || this.getAttribute('data-theme') !== theme
    this.currentTheme = theme
    this.setAttribute('data-theme', theme)
    this.style.colorScheme = theme
    return changed
  }
}
