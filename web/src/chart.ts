import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import type { PropertyValueMap } from 'lit'
import { SignalWatcher } from '@lit-labs/signals'
import embed, { type VisualizationSpec, type EmbedOptions, type Result } from 'vega-embed'

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

@customElement('tbx-chart')
export class TbxChart extends SignalWatcher(LitElement) {
  static override styles = css`
    :host {
      display: block;
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

  protected override firstUpdated (changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(changedProperties)
    void this.renderChart()
  }

  protected override updated (changedProperties: PropertyValueMap<this>): void {
    super.updated(changedProperties)
    if (changedProperties.has('spec') || changedProperties.has('options')) {
      void this.renderChart()
    }
  }

  override disconnectedCallback (): void {
    this.destroyChart()
    super.disconnectedCallback()
  }

  protected render (): unknown {
    return html`<div id="chart" part="chart"></div>`
  }

  private async renderChart (): Promise<void> {
    if (this.chartContainer == null) return

    this.destroyChart()

    const spec = this.spec ?? DEFAULT_SPEC
    const options: EmbedOptions = { ...DEFAULT_OPTIONS, ...(this.options ?? {}) }

    try {
      this.embedResult = await embed(this.chartContainer, spec, options)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to render vega chart', error)
      this.chartContainer.textContent = 'Unable to render chart.'
    }
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
