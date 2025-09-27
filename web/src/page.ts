import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'

import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js'
import '@shoelace-style/shoelace/dist/components/tree/tree.js'
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js'

import type SlSplitPanel from '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js'
import './theme-toggle'
type TreeSelectionEvent = CustomEvent<{
  selection: Array<HTMLElement & { dataset: DOMStringMap }>
}>

interface MenuNode {
  id: string
  label: string
  children?: MenuNode[]
}

const MENU_TREE: MenuNode = {
  id: 'catalog',
  label: 'Catalog',
  children: [
    {
      id: 'catalog-clothing',
      label: 'Clothing',
      children: [
        {
          id: 'catalog-clothing-womens',
          label: "Women's",
          children: [
            {
              id: 'catalog-clothing-womens-shirts-tops',
              label: 'Shirts & Tops'
            },
            {
              id: 'catalog-clothing-womens-outerwear',
              label: 'Outerwear'
            }
          ]
        },
        {
          id: 'catalog-clothing-mens',
          label: "Men's",
          children: [
            {
              id: 'catalog-clothing-mens-shirts',
              label: 'Shirts'
            },
            {
              id: 'catalog-clothing-mens-pants',
              label: 'Pants'
            }
          ]
        }
      ]
    },
    {
      id: 'catalog-accessories',
      label: 'Accessories',
      children: [
        {
          id: 'catalog-accessories-bags',
          label: 'Bags'
        },
        {
          id: 'catalog-accessories-jewelry',
          label: 'Jewelry'
        }
      ]
    }
  ]
}

const DEFAULT_SELECTED_ID = 'catalog-clothing-womens-shirts-tops'
const PANEL_OPEN_KEY = 'tbx-page:panel-open'
const PANEL_POSITION_KEY = 'tbx-page:panel-position'
const SELECTION_KEY = 'tbx-page:selected-node'
const DEFAULT_PANEL_POSITION = 22
const NARROW_VIEWPORT_QUERY = '(max-width: 768px)'

function isBrowser (): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function clamp (value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function findPath (node: MenuNode, targetId: string, trail: MenuNode[] = []): MenuNode[] | null {
  const nextTrail = [...trail, node]
  if (node.id === targetId) {
    return nextTrail
  }
  if (node.children != null) {
    for (const child of node.children) {
      const match = findPath(child, targetId, nextTrail)
      if (match != null) {
        return match
      }
    }
  }
  return null
}

@customElement('tbx-page')
export class TbxPage extends LitElement {
  @property({ type: String, attribute: 'page-title' })
    pageTitle: string = 'ToolboxUI'

  @state()
  private selectedId = DEFAULT_SELECTED_ID

  @state()
  private panelOpen = true

  @state()
  private panelPosition = DEFAULT_PANEL_POSITION

  private storedPanelOpen = true
  private skipNextPersist = false
  private narrowQuery: MediaQueryList | null = null
  private narrowQueryListener: ((event: MediaQueryListEvent) => void) | null = null
  private toolbarObserver: ResizeObserver | null = null
  private isInitialised = false

  static styles = css`
    :host {
      --page-toolbar-height: 0px;
      --page-shell-padding-inline: clamp(0.75rem, 2vw, 1.5rem);
      --page-shell-padding-block: clamp(0.85rem, 2vw, 1.5rem);
      --page-surface: var(--sl-color-neutral-0);
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-height: 100vh;
    }

    :host-context(.sl-theme-dark) {
      --page-surface: var(--sl-color-neutral-950, var(--sl-color-neutral-900));
    }

    @media (max-width: 640px) {
      :host {
        --page-shell-padding-inline: 0rem;
      }
    }

    .page-shell {
      display: flex;
      flex-direction: column;
      gap: 0;
      min-height: 100vh;
      padding: var(--page-shell-padding-block) var(--page-shell-padding-inline) 0;
      background-color: var(--page-surface);
    }

    header.page-header {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: nowrap;
      margin-inline: calc(-1 * var(--page-shell-padding-inline));
      padding: 0 max(var(--page-shell-padding-inline), env(safe-area-inset-right)) clamp(0.4rem, 1vw, 0.6rem) max(var(--page-shell-padding-inline), env(safe-area-inset-left));
    }

    header.page-header h1 {
      font-size: 1.75rem;
      margin: 0;
      flex: 1 1 auto;
      min-width: 0;
    }

    header.page-header tbx-theme-toggle {
      margin-left: auto;
      flex: 0 0 auto;
    }

    .menu-toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      padding-block: 0.35rem;
      margin-inline: calc(-1 * var(--page-shell-padding-inline));
      padding-inline: max(var(--page-shell-padding-inline), env(safe-area-inset-left)) max(var(--page-shell-padding-inline), env(safe-area-inset-right));
      background-color: var(--page-toolbar-background, var(--page-surface));
      border-bottom: 1px solid var(--page-divider-color, var(--sl-color-neutral-200));
    }

    .menu-toolbar::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    :host-context(.sl-theme-dark) .menu-toolbar {
      --page-toolbar-background: var(--sl-color-neutral-900);
      --page-divider-color: var(--sl-color-neutral-800);
    }

    .menu-toolbar sl-breadcrumb {
      flex: 1 1 auto;
      min-width: 0;
    }

    sl-icon-button::part(base) {
      font-size: 1.25rem;
    }

    sl-split-panel {
      width: 100%;
      min-height: 60vh;
      margin-inline: calc(-1 * var(--page-shell-padding-inline));
      margin-bottom: calc(-1 * var(--page-shell-padding-block));
      padding-bottom: var(--page-shell-padding-block);
      flex: 1 1 auto;
      --min: 200px;
      --max: 25%;
      --divider-width: 1px;
      --divider-hit-area: 14px;
      background-color: var(--page-surface);
    }

    sl-split-panel::part(start),
    sl-split-panel::part(end) {
      background-color: var(--page-surface);
      padding: 0;
    }

    sl-split-panel::part(divider) {
      background-color: var(--page-divider-color, var(--sl-color-neutral-200));
    }

    sl-split-panel.collapsed {
      --divider-width: 0;
      --divider-hit-area: 0;
      --min: 0;
      --max: 0;
    }

    sl-split-panel.collapsed::part(start) {
      display: none;
    }

    sl-split-panel::part(end) {
      min-width: 320px;
    }

    nav.tree-panel {
      position: sticky;
      top: var(--page-toolbar-height, 0px);
      min-height: calc(100vh - var(--page-toolbar-height, 0px));
      max-height: calc(100vh - var(--page-toolbar-height, 0px));
      overflow: auto;
      padding: clamp(0.25rem, 0.8vw, 0.4rem) clamp(0.4rem, 1vw, 0.55rem) 0;
      box-sizing: border-box;
      border-right: solid 1px var(--page-divider-color, var(--sl-color-neutral-200));
      background-color: var(--page-surface);
    }

    .content-panel {
      padding: clamp(0.4rem, 1vw, 0.65rem) var(--page-shell-padding-inline) var(--page-shell-padding-block) var(--page-shell-padding-inline);
      box-sizing: border-box;
      width: 100%;
      min-width: 320px;
      overflow-y: visible;
      overflow-x: auto;
      overflow-wrap: anywhere;
      word-break: break-word;
      background-color: var(--page-surface);
    }

    nav.tree-panel sl-tree::part(base) {
      background-color: transparent;
      padding: 0;
    }

    nav.tree-panel sl-tree-item::part(item) {
      border-radius: 4px;
    }

    sl-split-panel::part(divider) {
      background-color: var(--page-divider-color, var(--sl-color-neutral-200));
    }

    :host-context(.sl-theme-dark) sl-split-panel::part(divider) {
      background-color: var(--sl-color-neutral-800);
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

    @media (max-width: 768px) {
      :host {
        padding: 1rem;
      }
      sl-split-panel {
        min-height: 50vh;
      }
      header.page-header {
        gap: 0.75rem;
      }
    }

    @media (max-width: 540px) {
      header.page-header {
        flex-wrap: wrap;
      }
      header.page-header tbx-theme-toggle {
        margin-left: 0;
      }
    }

    @media (max-width: 600px) {
      .menu-toolbar sl-breadcrumb-item:not(:last-of-type) {
        display: none;
      }

      .menu-toolbar sl-breadcrumb-item::part(separator) {
        display: none;
      }
    }
  `

  connectedCallback (): void {
    super.connectedCallback()
    this.setupViewportWatcher()
    this.restoreState()
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()
    this.teardownViewportWatcher()
    if (this.toolbarObserver != null) {
      this.toolbarObserver.disconnect()
      this.toolbarObserver = null
    }
  }

  firstUpdated (): void {
    this.isInitialised = true
    if (!this.panelOpen && this.panelPosition > 0) {
      this.panelPosition = clamp(this.panelPosition, 5, 25)
    }

    this.observeToolbarHeight()
  }

  private restoreState (): void {
    if (!isBrowser()) return

    try {
      const storedOpen = window.localStorage.getItem(PANEL_OPEN_KEY)
      let resolvedOpen: boolean
      if (storedOpen === 'true' || storedOpen === 'false') {
        resolvedOpen = storedOpen === 'true'
      } else {
        resolvedOpen = !window.matchMedia(NARROW_VIEWPORT_QUERY).matches
      }
      this.storedPanelOpen = resolvedOpen
      this.panelOpen = resolvedOpen

      const storedPosition = window.localStorage.getItem(PANEL_POSITION_KEY)
      if (storedPosition != null) {
        const parsed = Number.parseFloat(storedPosition)
        if (!Number.isNaN(parsed)) {
          this.panelPosition = clamp(parsed, 5, 25)
        }
      }

      const storedSelection = window.localStorage.getItem(SELECTION_KEY)
      if (storedSelection != null && findPath(MENU_TREE, storedSelection) != null) {
        this.selectedId = storedSelection
      }
    } catch {
      // Ignore storage errors
    }

    if (this.isNarrowViewport()) {
      this.forceCollapseForMobile()
    }
  }

  private persistState (): void {
    if (!isBrowser() || !this.isInitialised) return
    if (this.skipNextPersist) {
      this.skipNextPersist = false
      return
    }
    try {
      window.localStorage.setItem(PANEL_OPEN_KEY, String(this.storedPanelOpen))
      window.localStorage.setItem(PANEL_POSITION_KEY, String(this.panelPosition))
      window.localStorage.setItem(SELECTION_KEY, this.selectedId)
    } catch {
      // ignore storage issues
    }
  }

  private setupViewportWatcher (): void {
    if (!isBrowser()) return
    const query = window.matchMedia(NARROW_VIEWPORT_QUERY)
    this.narrowQuery = query
    const listener = (event: MediaQueryListEvent): void => {
      this.handleViewportChange(event.matches)
    }
    this.narrowQueryListener = listener

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', listener)
    } else if (typeof query.addListener === 'function') {
      query.addListener(listener)
    }
  }

  private teardownViewportWatcher (): void {
    const query = this.narrowQuery
    const listener = this.narrowQueryListener
    if (query != null && listener != null) {
      if (typeof query.removeEventListener === 'function') {
        query.removeEventListener('change', listener)
      } else if (typeof query.removeListener === 'function') {
        query.removeListener(listener)
      }
    }
    this.narrowQuery = null
    this.narrowQueryListener = null
  }

  private observeToolbarHeight (): void {
    if (!isBrowser()) return
    const toolbar = this.shadowRoot?.querySelector('.menu-toolbar') as HTMLElement | null
    if (toolbar == null) {
      this.style.removeProperty('--page-toolbar-height')
      return
    }

    const updateHeight = (): void => {
      const height = toolbar.getBoundingClientRect().height
      this.style.setProperty('--page-toolbar-height', `${height}px`)
    }

    updateHeight()

    if (typeof ResizeObserver === 'function') {
      if (this.toolbarObserver == null) {
        this.toolbarObserver = new ResizeObserver(() => {
          updateHeight()
        })
      } else {
        this.toolbarObserver.disconnect()
      }
      this.toolbarObserver.observe(toolbar)
    }
  }

  private handleViewportChange (isNarrow: boolean): void {
    if (isNarrow) {
      this.forceCollapseForMobile()
    } else if (this.panelOpen !== this.storedPanelOpen) {
      this.panelOpen = this.storedPanelOpen
    }
  }

  private forceCollapseForMobile (): void {
    if (!this.panelOpen) return
    this.skipNextPersist = true
    this.panelOpen = false
  }

  private isNarrowViewport (): boolean {
    return this.narrowQuery?.matches ?? false
  }

  private get selectedPath (): MenuNode[] {
    const path = findPath(MENU_TREE, this.selectedId)
    return path ?? findPath(MENU_TREE, MENU_TREE.id) ?? [MENU_TREE]
  }

  private get expandedNodeIds (): Set<string> {
    const path = this.selectedPath
    const expanded = path.slice(0, -1).map(node => node.id)
    return new Set(expanded)
  }

  private get effectivePanelPosition (): number {
    return this.panelOpen ? this.panelPosition : 0
  }

  private renderTree (nodes: MenuNode[]): TemplateResult[] {
    const expandedIds = this.expandedNodeIds
    return nodes.map(node => {
      const isExpanded = expandedIds.has(node.id)
      const isSelected = node.id === this.selectedId
      const hasChildren = Array.isArray(node.children) && node.children.length > 0

      return html`
        <sl-tree-item
          part="tree-item"
          ?expanded=${isExpanded}
          ?selected=${isSelected}
          data-node-id=${node.id}
        >
          ${node.label}
          ${hasChildren ? html`${this.renderTree(node.children ?? [])}` : nothing}
        </sl-tree-item>
      `
    })
  }

  private readonly handleTreeSelection = (event: TreeSelectionEvent): void => {
    const [item] = event.detail.selection
    if (item == null) return
    const nodeId = item.dataset.nodeId
    if (nodeId == null || nodeId === this.selectedId) return
    if (findPath(MENU_TREE, nodeId) == null) return
    this.selectedId = nodeId
    this.persistState()
    if (this.isNarrowViewport()) {
      this.forceCollapseForMobile()
    }
  }

  private handleBreadcrumbClick (nodeId: string): void {
    if (nodeId === this.selectedId) return
    if (findPath(MENU_TREE, nodeId) == null) return
    this.selectedId = nodeId
    this.persistState()
    if (this.isNarrowViewport()) {
      this.forceCollapseForMobile()
    }
  }

  private readonly handlePanelToggle = (): void => {
    this.panelOpen = !this.panelOpen
    this.storedPanelOpen = this.panelOpen
    this.persistState()
  }

  private readonly handleSplitReposition = (event: CustomEvent): void => {
    if (!this.panelOpen) return

    const panel = event.currentTarget as SlSplitPanel | null
    if (panel == null) return
    const nextPosition = clamp(panel.position ?? DEFAULT_PANEL_POSITION, 5, 25)
    if (this.panelPosition !== nextPosition) {
      this.panelPosition = nextPosition
      this.persistState()
    }
  }

  private renderBreadcrumbs (): TemplateResult {
    const path = this.selectedPath
    return html`
      <sl-breadcrumb>
        ${path.map((node, index) => {
          const isLast = index === path.length - 1
          const handleClick = isLast ? undefined : () => this.handleBreadcrumbClick(node.id)
          return html`
            <sl-breadcrumb-item
              aria-current=${isLast ? 'page' : nothing}
              ?disabled=${isLast}
              @click=${handleClick}
            >
              ${node.label}
            </sl-breadcrumb-item>
          `
        })}
      </sl-breadcrumb>
    `
  }

  protected updated (): void {
    this.persistState()
  }

  render (): TemplateResult {
    const panelClass = this.panelOpen ? '' : 'collapsed'

    return html`
      <div class="page-shell">
        <header class="page-header">
          <h1>${this.pageTitle}</h1>
          <tbx-theme-toggle></tbx-theme-toggle>
        </header>

        <div class="menu-toolbar">
          <sl-icon-button
            name="list"
            label=${this.panelOpen ? 'Hide navigation menu' : 'Show navigation menu'}
            @click=${this.handlePanelToggle}
          ></sl-icon-button>
          ${this.renderBreadcrumbs()}
        </div>

        <sl-split-panel
          class=${panelClass}
          primary="start"
          .position=${this.effectivePanelPosition}
          @sl-reposition=${this.handleSplitReposition}
        >
          <nav
            slot="start"
            class="tree-panel"
            aria-label="Site navigation"
            ?aria-hidden=${!this.panelOpen}
            ?hidden=${!this.panelOpen}
          >
            <sl-tree
              selection="single"
              tabindex=${this.panelOpen ? '0' : '-1'}
              @sl-selection-change=${this.handleTreeSelection}
            >
              ${this.renderTree([MENU_TREE])}
            </sl-tree>
          </nav>

          <div slot="end" class="content-panel">
            <slot></slot>
          </div>
        </sl-split-panel>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tbx-page': TbxPage
  }
}
