import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import type { PropertyValueMap } from 'lit'
import { SignalWatcher } from '@lit-labs/signals'
import embed, { type VisualizationSpec, type EmbedOptions, type Result } from 'vega-embed'
import { getCurrentTheme, onThemeChange, type ThemeName } from './theme-toggle'

const DEFAULT_SPEC: VisualizationSpec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  description: 'Default chart rendered by tbx-chart.',
  width: 'container',
  height: 240,
  autosize: { type: 'fit', contains: 'padding' },
  data: {
    values: [
      { category: 'Alpha', value: 28 },
      { category: 'Beta', value: 55 },
      { category: 'Gamma', value: 43 },
      { category: 'Delta', value: 91 },
      { category: 'Epsilon', value: 81 }
    ]
  },
  mark: { type: 'bar', tooltip: true },
  encoding: {
    x: { field: 'category', type: 'ordinal', sort: 'ascending', title: 'Category' },
    y: { field: 'value', type: 'quantitative', title: 'Value' }
  },
  config: {
    axis: {
      labelFont: 'inherit',
      titleFont: 'inherit'
    },
    font: 'inherit'
  }
}

const DEFAULT_OPTIONS: EmbedOptions = {
  actions: false
}

type ChartConfig = Record<string, unknown>

const CHART_THEME_CONFIG: Record<ThemeName, ChartConfig> = {
  light: {
    background: 'transparent',
    axis: {
      labelColor: '#111827',
      titleColor: '#111827',
      gridColor: '#e5e7eb'
    },
    legend: {
      labelColor: '#111827',
      titleColor: '#111827'
    },
    title: {
      color: '#111827'
    },
    view: {
      stroke: '#e5e7eb'
    },
    mark: {
      color: '#2563eb'
    },
    range: {
      category: ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed', '#0ea5e9']
    }
  },
  dark: {
    background: 'transparent',
    axis: {
      labelColor: '#e5e7eb',
      titleColor: '#e5e7eb',
      gridColor: '#4b5563'
    },
    legend: {
      labelColor: '#e5e7eb',
      titleColor: '#e5e7eb'
    },
    title: {
      color: '#f3f4f6'
    },
    view: {
      stroke: '#4b5563'
    },
    mark: {
      color: '#60a5fa'
    },
    range: {
      category: ['#60a5fa', '#f97316', '#34d399', '#facc15', '#f472b6', '#a855f7']
    }
  }
}

function isPlainObject (value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null && !Array.isArray(value)
}

function mergeNested (themeValue: unknown, userValue: unknown): Record<string, unknown> | undefined {
  if (!isPlainObject(themeValue) && !isPlainObject(userValue)) {
    return undefined
  }

  return {
    ...(isPlainObject(themeValue) ? themeValue : {}),
    ...(isPlainObject(userValue) ? userValue : {})
  }
}

function mergeConfig (themeConfig: ChartConfig, userConfig?: ChartConfig): ChartConfig {
  const merged: ChartConfig = {
    ...themeConfig,
    ...(userConfig ?? {})
  }

  const axis = mergeNested(themeConfig.axis, userConfig?.axis)
  if (axis != null) {
    merged.axis = axis
  }

  const legend = mergeNested(themeConfig.legend, userConfig?.legend)
  if (legend != null) {
    merged.legend = legend
  }

  const title = mergeNested(themeConfig.title, userConfig?.title)
  if (title != null) {
    merged.title = title
  }

  const view = mergeNested(themeConfig.view, userConfig?.view)
  if (view != null) {
    merged.view = view
  }

  const mark = mergeNested(themeConfig.mark, userConfig?.mark)
  if (mark != null) {
    merged.mark = mark
  }

  const range = mergeNested(themeConfig.range, userConfig?.range)
  if (range != null) {
    merged.range = range
  }

  return merged
}

@customElement('tbx-chart')
export class TbxChart extends SignalWatcher(LitElement) {
  static override styles = css`
    :host {
      display: block;
      color: inherit;
    }

    :host([data-theme='dark']) {
      color-scheme: dark;
    }

    :host([data-theme='light']) {
      color-scheme: light;
    }

    #chart {
      width: 100%;
    }
  `

  @property({ attribute: false })
    spec: VisualizationSpec | undefined = DEFAULT_SPEC

  @property({ attribute: false })
    options: EmbedOptions | undefined = DEFAULT_OPTIONS

  @query('#chart')
  private readonly chartContainer!: HTMLDivElement

  private embedResult: Result | undefined
  private unsubscribeTheme: (() => void) | undefined
  private currentTheme: ThemeName = getCurrentTheme()

  override connectedCallback (): void {
    super.connectedCallback()
    const initialTheme = getCurrentTheme()
    const initialChanged = this.applyTheme(initialTheme)

    if (this.chartContainer != null && (this.embedResult == null || initialChanged)) {
      void this.renderChart()
    }

    this.unsubscribeTheme = onThemeChange(theme => {
      const changed = this.applyTheme(theme)
      if (changed) {
        void this.renderChart()
      }
    })
  }

  override disconnectedCallback (): void {
    this.destroyChart()
    if (this.unsubscribeTheme != null) {
      this.unsubscribeTheme()
      this.unsubscribeTheme = undefined
    }
    super.disconnectedCallback()
  }

  protected override firstUpdated (changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(changedProperties)
    if (this.embedResult == null) {
      void this.renderChart()
    }
  }

  protected override updated (changedProperties: PropertyValueMap<this>): void {
    super.updated(changedProperties)
    if (changedProperties.has('spec') || changedProperties.has('options')) {
      void this.renderChart()
    }
  }

  protected render (): unknown {
    return html`<div id="chart" part="chart"></div>`
  }

  private async renderChart (): Promise<void> {
    const container = this.chartContainer
    if (container == null) return

    this.destroyChart()

    const spec = this.spec ?? DEFAULT_SPEC
    const options = this.createEmbedOptions()

    try {
      this.embedResult = await embed(container, spec, options)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to render vega chart', error)
      container.textContent = 'Unable to render chart.'
    }
  }

  private createEmbedOptions (): EmbedOptions {
    const userOptions = this.options ?? {}
    const themeConfig = CHART_THEME_CONFIG[this.currentTheme]

    const baseOptions: EmbedOptions = {
      ...DEFAULT_OPTIONS,
      ...userOptions
    }

    const userConfig = typeof userOptions.config === 'object' && userOptions.config != null
      ? (userOptions.config as ChartConfig)
      : undefined

    if (typeof userOptions.config === 'string') {
      baseOptions.config = userOptions.config
    } else {
      baseOptions.config = mergeConfig(themeConfig, userConfig)
    }

    return baseOptions
  }

  private applyTheme (theme: ThemeName): boolean {
    const changed = this.currentTheme !== theme
    this.currentTheme = theme
    this.setAttribute('data-theme', theme)
    return changed
  }

  private destroyChart (): void {
    if (this.embedResult != null) {
      this.embedResult.view.finalize()
      this.embedResult = undefined
    }

    if (this.chartContainer != null) {
      this.chartContainer.replaceChildren()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tbx-chart': TbxChart
  }
}
