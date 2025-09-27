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
const PANEL_OPEN_KEY = 'tbx-page-menu:panel-open'
const PANEL_POSITION_KEY = 'tbx-page-menu:panel-position'
const SELECTION_KEY = 'tbx-page-menu:selected-node'
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

@customElement('tbx-page-menu')
export class TbxPageMenu extends LitElement {
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
  private isInitialised = false

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
    }

    .page-shell {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    header.page-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: nowrap;
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
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    sl-icon-button::part(base) {
      font-size: 1.25rem;
    }

    sl-split-panel {
      width: 100%;
      min-height: 60vh;
      --min: 200px;
      --max: 25%;
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

    nav.tree-panel {
      height: 100%;
      overflow: auto;
      padding: 1rem;
      box-sizing: border-box;
      border-right: solid 1px var(--sl-color-neutral-200);
      background-color: var(--sl-color-neutral-0);
    }

    :host-context(.sl-theme-dark) nav.tree-panel {
      border-right: solid 1px var(--sl-color-neutral-600);
      background-color: var(--sl-color-neutral-900);
    }

    .content-panel {
      padding: 0 0 2rem 1.5rem;
      box-sizing: border-box;
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
  `

  connectedCallback (): void {
    super.connectedCallback()
    this.setupViewportWatcher()
    this.restoreState()
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()
    this.teardownViewportWatcher()
  }

  firstUpdated (): void {
    this.isInitialised = true
    if (!this.panelOpen && this.panelPosition > 0) {
      this.panelPosition = clamp(this.panelPosition, 5, 25)
    }
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
    'tbx-page-menu': TbxPageMenu
  }
}
