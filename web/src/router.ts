import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'
import { repeat } from 'lit/directives/repeat.js'

import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/tree/tree.js'
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js'

import './theme-toggle'
import type { TbxPage } from './tbx-page'

type TreeSelectionEvent = CustomEvent<{
  selection: Array<HTMLElement & { dataset: DOMStringMap }>
}>

interface RouteNode {
  route: string
  title: string
  children: RouteNode[]
}

interface RoutedPage {
  element: TbxPage
  route: string
  title: string
  parentRoute: string | null
}

const PANEL_OPEN_KEY = 'tbx-router:panel-open'
const SELECTION_KEY = 'tbx-router:selected-route'
const NARROW_VIEWPORT_QUERY = '(max-width: 768px)'

function isBrowser (): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

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

function getSegments (route: string): string[] {
  if (route === '/') return []
  return route.replace(/^\//, '').split('/')
}

function getParentRoute (route: string): string | null {
  const segments = getSegments(route)
  if (segments.length <= 1) return null
  return `/${segments.slice(0, -1).join('/')}`
}

function getAncestorRoutes (route: string): string[] {
  const segments = getSegments(route)
  if (segments.length === 0) return []
  const ancestors: string[] = []
  for (let i = 1; i < segments.length; i++) {
    ancestors.push(`/${segments.slice(0, i).join('/')}`)
  }
  return ancestors
}

function normalizePath (input: string): string {
  if (input === '') return '/'
  if (!input.startsWith('/')) {
    input = `/${input}`
  }
  if (input.length > 1 && input.endsWith('/')) {
    input = input.replace(/\/+/g, '/')
    input = input.replace(/\/+$/, '')
    if (input === '') {
      input = '/'
    }
  }
  return input
}

function normalizeBase (input: string): string {
  if (input === '' || input === '/') return ''
  return input.replace(/\/+$/, '').replace(/\/+/g, '/')
}

function joinPath (base: string, route: string): string {
  const normalizedBase = normalizeBase(base)
  const normalizedRoute = normalizeRoute(route)
  if (normalizedRoute === '/') {
    return normalizedBase === '' ? '/' : normalizedBase
  }
  if (normalizedBase === '') {
    return normalizedRoute
  }
  return `${normalizedBase}${normalizedRoute}`
}

function subtractRoute (path: string, route: string): string | null {
  const normalizedRoute = normalizeRoute(route)
  if (normalizedRoute === '/') {
    return path
  }
  if (!path.endsWith(normalizedRoute)) return null
  const endIndex = path.length - normalizedRoute.length
  if (endIndex > 0 && path[endIndex - 1] !== '/') return null
  const base = path.slice(0, endIndex)
  return base === '' ? '' : base.replace(/\/+$/, '')
}

function buildRouteTree (pages: RoutedPage[]): RouteNode[] {
  const nodeMap = new Map<string, RouteNode>()
  for (const page of pages) {
    nodeMap.set(page.route, { route: page.route, title: page.title, children: [] })
  }

  const roots: RouteNode[] = []
  for (const page of pages) {
    const node = nodeMap.get(page.route)
    if (node == null) continue
    const parentRoute = page.parentRoute
    if (parentRoute != null && nodeMap.has(parentRoute)) {
      nodeMap.get(parentRoute)?.children.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}

function findRoutePath (nodes: RouteNode[], targetRoute: string, trail: RouteNode[] = []): RouteNode[] | null {
  for (const node of nodes) {
    const nextTrail = [...trail, node]
    if (node.route === targetRoute) {
      return nextTrail
    }
    if (node.children.length > 0) {
      const match = findRoutePath(node.children, targetRoute, nextTrail)
      if (match != null) {
        return match
      }
    }
  }
  return null
}

@customElement('tbx-router')
export class TbxRouter extends LitElement {
  @property({ type: String })
    title: string = 'ToolboxUI'

  @state()
  private panelOpen = true

  @state()
  private activeRoute: string | null = null

  @state()
  private pages: RoutedPage[] = []

  @query('slot')
  private readonly contentSlot?: HTMLSlotElement

  private storedPanelOpen = true
  private skipNextPersist = false
  private narrowQuery: MediaQueryList | null = null
  private narrowQueryListener: ((event: MediaQueryListEvent) => void) | null = null
  private layoutObserver: ResizeObserver | null = null
  private layoutScrollHandler: (() => void) | null = null
  private isInitialised = false
  private storedRoutePreference: string | null = null
  private basePath = ''
  private expandedRouteSet: Set<string> = new Set()

  static styles = css`
    :host {
      --page-toolbar-height: 0px;
      --page-shell-padding-inline: clamp(0.75rem, 2vw, 1.5rem);
      --page-shell-padding-block: clamp(0.85rem, 2vw, 1.5rem);
      --page-surface: var(--sl-color-neutral-0);
      --tree-panel-width: 25%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
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
      padding: var(--page-shell-padding-block) var(--page-shell-padding-inline) 0;
      background-color: var(--page-surface);
      flex: 1 1 auto;
      min-height: 0;
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
      z-index: 20;
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

    .content-shell {
      width: 100%;
      flex: 1 1 auto;
      min-height: 0;
      margin-inline: calc(-1 * var(--page-shell-padding-inline));
      margin-bottom: 0;
      padding-bottom: 0;
      display: flex;
      align-items: stretch;
      gap: 0;
      background-color: var(--page-surface);
    }

    .content-shell.panel-open .content-panel {
      border-inline-start: 1px solid var(--page-divider-color, var(--sl-color-neutral-200));
    }

    .content-shell.panel-collapsed .content-panel {
      border-inline-start: none;
    }

    :host-context(.sl-theme-dark) .content-shell.panel-open .content-panel {
      border-inline-start-color: var(--sl-color-neutral-800);
    }

    nav.tree-panel {
      position: sticky;
      top: var(--page-toolbar-height, 0px);
      align-self: flex-start;
      display: block;
      flex: 0 0 var(--tree-panel-width);
      max-width: var(--tree-panel-width);
      min-width: var(--tree-panel-width);
      padding: 0;
      margin-bottom: var(--page-shell-padding-block);
      box-sizing: border-box;
      background-color: var(--page-surface);
    }

    nav.tree-panel .tree-scroll-container {
      max-height: calc(100vh - var(--page-toolbar-height, 0px) - var(--page-shell-padding-block));
      overflow: auto;
      padding: clamp(0.4rem, 1vw, 0.55rem) clamp(0.25rem, 0.8vw, 0.45rem) clamp(0.6rem, 1.2vw, 0.8rem) clamp(0.5rem, 1.2vw, 0.65rem);
      box-sizing: border-box;
    }

    nav.tree-panel sl-tree {
      min-height: 100%;
    }

    nav.tree-panel sl-tree::part(base) {
      background-color: transparent;
      padding: 0;
    }

    .content-panel {
      flex: 1 1 auto;
      min-height: 0;
      min-width: 0;
      padding: clamp(0.4rem, 1vw, 0.65rem) var(--page-shell-padding-inline) var(--page-shell-padding-block) var(--page-shell-padding-inline);
      box-sizing: border-box;
      overflow: auto;
      overflow-wrap: anywhere;
      word-break: break-word;
      background-color: var(--page-surface);
    }

    nav.tree-panel sl-tree-item::part(item) {
      border-radius: 4px;
    }

    nav.tree-panel sl-tree-item::part(label) {
      display: block;
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    ::slotted(*) {
      max-width: 100%;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      :host {
        padding: 1rem;
        --tree-panel-width: clamp(240px, 80vw, 320px);
      }
      .content-shell {
        min-height: 50vh;
        position: relative;
      }
      header.page-header {
        gap: 0.75rem;
      }
      nav.tree-panel {
        flex: 0 0 var(--tree-panel-width);
        width: var(--tree-panel-width);
        max-width: none;
        min-width: 0;
        margin-bottom: 0;
        box-shadow: none;
      }
      .content-shell.panel-open nav.tree-panel {
        position: fixed;
        inset-inline-start: env(safe-area-inset-left);
        top: var(--page-overlay-top-offset, 0px);
        height: calc(100vh - var(--page-overlay-top-offset, 0px));
        z-index: 40;
        box-shadow: none;
        border-inline-end: 1px solid var(--page-divider-color, var(--sl-color-neutral-200));
      }
      :host-context(.sl-theme-dark) .content-shell.panel-open nav.tree-panel {
        border-inline-end-color: var(--sl-color-neutral-800);
        box-shadow: none;
      }
      .content-shell.panel-open .content-panel {
        border-inline-start: none;
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
    if (isBrowser()) {
      window.addEventListener('popstate', this.handlePopState)
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()
    this.teardownViewportWatcher()
    if (this.layoutObserver != null) {
      this.layoutObserver.disconnect()
      this.layoutObserver = null
    }
    if (this.layoutScrollHandler != null) {
      window.removeEventListener('scroll', this.layoutScrollHandler)
      this.layoutScrollHandler = null
    }
    if (isBrowser()) {
      window.removeEventListener('popstate', this.handlePopState)
    }
  }

  firstUpdated (): void {
    this.isInitialised = true
    this.observeLayoutMetrics()
    this.refreshPages()
    this.syncDocumentTitle()
  }

  protected updated (changed: Map<string, unknown>): void {
    if (changed.has('title')) {
      this.syncDocumentTitle()
    }
    if (changed.has('activeRoute') || changed.has('panelOpen')) {
      this.persistState()
    }
  }

  private syncDocumentTitle (): void {
    if (!isBrowser()) return
    document.title = this.title
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

      this.storedRoutePreference = window.localStorage.getItem(SELECTION_KEY)
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
      if (this.activeRoute != null) {
        window.localStorage.setItem(SELECTION_KEY, this.activeRoute)
      }
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

  private observeLayoutMetrics (): void {
    if (!isBrowser()) return
    const toolbar = this.shadowRoot?.querySelector('.menu-toolbar') as HTMLElement | null
    const header = this.shadowRoot?.querySelector('header.page-header') as HTMLElement | null

    const updateHeights = (): void => {
      const toolbarRect = toolbar?.getBoundingClientRect() ?? null
      const headerRect = header?.getBoundingClientRect() ?? null
      const toolbarHeight = toolbarRect?.height ?? 0
      const headerHeight = headerRect?.height ?? 0
      const overlayTop = toolbarRect?.bottom ?? headerRect?.bottom ?? 0
      this.style.setProperty('--page-toolbar-height', `${toolbarHeight}px`)
      this.style.setProperty('--page-header-height', `${headerHeight}px`)
      this.style.setProperty('--page-overlay-top-offset', `${Math.max(0, overlayTop)}px`)
    }

    updateHeights()

    const handleScroll = (): void => {
      updateHeights()
    }

    if (this.layoutScrollHandler != null) {
      window.removeEventListener('scroll', this.layoutScrollHandler)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    this.layoutScrollHandler = handleScroll

    if (typeof ResizeObserver === 'function') {
      if (this.layoutObserver == null) {
        this.layoutObserver = new ResizeObserver(() => {
          updateHeights()
        })
      } else {
        this.layoutObserver.disconnect()
      }
      const targets = [toolbar, header].filter((el): el is HTMLElement => el != null)
      for (const target of targets) {
        this.layoutObserver.observe(target)
      }
    }
  }

  private refreshPages (): void {
    const slot = this.contentSlot
    if (slot == null) return

    const assigned = slot.assignedElements({ flatten: true })
    const pages: RoutedPage[] = []
    const seen = new Set<string>()

    for (const element of assigned) {
      if (!(element instanceof HTMLElement) || element.tagName !== 'TBX-PAGE') {
        continue
      }
      const pageElement = element as TbxPage
      const normalizedRoute = normalizeRoute(pageElement.route)
      const normalizedTitle = pageElement.title.trim() !== '' ? pageElement.title.trim() : normalizedRoute
      if (!seen.has(normalizedRoute)) {
        if (pageElement.route !== normalizedRoute) {
          pageElement.route = normalizedRoute
        }
        pages.push({
          element: pageElement,
          route: normalizedRoute,
          title: normalizedTitle,
          parentRoute: getParentRoute(normalizedRoute)
        })
        seen.add(normalizedRoute)
      } else {
        console.warn(`Duplicate tbx-page route detected: ${normalizedRoute}. Only the first occurrence will be used.`)
        pageElement.hidden = true
      }
    }

    const validRoutes = new Set(pages.map(page => page.route))
    this.expandedRouteSet = new Set([...this.expandedRouteSet].filter(route => validRoutes.has(route)))

    this.pages = pages
    this.syncRouteWithLocation(this.activeRoute == null)
    this.updatePageVisibility()
  }

  private resolveRouteFromPath (path: string): { basePath: string, route: string | null } {
    const normalizedPath = normalizePath(path)
    const routes = [...this.pages.map(page => page.route)].sort((a, b) => b.length - a.length)

    for (const route of routes) {
      const baseCandidate = subtractRoute(normalizedPath, route)
      if (baseCandidate == null) continue
      const basePath = normalizeBase(baseCandidate)
      const expected = joinPath(basePath, route)
      if (normalizePath(expected) === normalizedPath) {
        return { basePath, route }
      }
    }

    return { basePath: this.basePath, route: null }
  }

  private syncRouteWithLocation (isInitial = false): void {
    if (!isBrowser()) return
    if (this.pages.length === 0) {
      this.activeRoute = null
      return
    }

    const { pathname } = window.location
    const { basePath, route } = this.resolveRouteFromPath(pathname)
    this.basePath = basePath

    let targetRoute = route
    if (targetRoute == null || !this.hasRoute(targetRoute)) {
      const stored = isInitial && this.storedRoutePreference != null && this.hasRoute(this.storedRoutePreference)
        ? this.storedRoutePreference
        : null
      targetRoute = stored ?? this.pages[0]?.route ?? null
      if (targetRoute != null) {
        this.updateHistory(targetRoute, true)
      }
    }

    if (targetRoute != null) {
      this.setActiveRoute(targetRoute, { skipHistory: true })
    }
  }

  private readonly handlePopState = (): void => {
    this.syncRouteWithLocation()
    this.updatePageVisibility()
  }

  private hasRoute (route: string): boolean {
    return this.pages.some(page => page.route === route)
  }

  private setActiveRoute (route: string, options: { replaceHistory?: boolean, skipHistory?: boolean } = {}): void {
    const normalizedRoute = normalizeRoute(route)
    const { replaceHistory = false, skipHistory = false } = options
    if (!this.hasRoute(normalizedRoute)) return

    const alreadyActive = this.activeRoute === normalizedRoute
    this.ensureRouteAncestorsExpanded(normalizedRoute)

    if (alreadyActive) {
      if (!skipHistory) {
        this.updateHistory(normalizedRoute, replaceHistory)
      }
      return
    }

    this.activeRoute = normalizedRoute
    this.updatePageVisibility()

    if (!skipHistory) {
      this.updateHistory(normalizedRoute, replaceHistory)
    }

    if (this.isNarrowViewport()) {
      this.forceCollapseForMobile()
    }
  }

  private ensureRouteAncestorsExpanded (route: string): void {
    const ancestors = [...getAncestorRoutes(route), route]
    let changed = false

    for (const candidate of ancestors) {
      if (!this.hasRoute(candidate)) continue
      if (!this.expandedRouteSet.has(candidate)) {
        this.expandedRouteSet.add(candidate)
        changed = true
      }
    }

    if (changed) {
      this.requestUpdate()
    }
  }

  private readonly handleTreeExpand = (event: Event): void => {
    const target = event.target as HTMLElement | null
    if (target == null || target.tagName !== 'SL-TREE-ITEM') return
    const route = target.dataset.route
    if (route == null) return
    if (!this.expandedRouteSet.has(route)) {
      this.expandedRouteSet.add(route)
      this.requestUpdate()
    }
  }

  private readonly handleTreeCollapse = (event: Event): void => {
    const target = event.target as HTMLElement | null
    if (target == null || target.tagName !== 'SL-TREE-ITEM') return
    const route = target.dataset.route
    if (route == null) return
    if (this.expandedRouteSet.delete(route)) {
      this.requestUpdate()
    }
  }

  private updateHistory (route: string, replace = false): void {
    if (!isBrowser()) return
    const path = joinPath(this.basePath, route)
    const suffix = `${window.location.search ?? ''}${window.location.hash ?? ''}`
    const nextUrl = `${path}${suffix}`
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (currentUrl === nextUrl) {
      return
    }

    if (replace) {
      window.history.replaceState({}, '', nextUrl)
    } else {
      window.history.pushState({}, '', nextUrl)
    }
  }

  private updatePageVisibility (): void {
    const active = this.activeRoute
    for (const page of this.pages) {
      const isActive = page.route === active
      page.element.hidden = !isActive
      page.element.toggleAttribute('inert', !isActive)
      page.element.toggleAttribute('data-active', isActive)
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

  private get routeTree (): RouteNode[] {
    return buildRouteTree(this.pages)
  }

  private get activePath (): RouteNode[] {
    if (this.activeRoute == null) return []
    return findRoutePath(this.routeTree, this.activeRoute) ?? []
  }

  private renderTree (nodes: RouteNode[]): TemplateResult {
    if (nodes.length === 0) {
      return html``
    }

    return html`${repeat(nodes, node => node.route, node => {
      const isExpanded = this.expandedRouteSet.has(node.route)
      const isSelected = node.route === this.activeRoute
      const hasChildren = node.children.length > 0

      return html`
        <sl-tree-item
          part="tree-item"
          data-route=${node.route}
          ?expanded=${isExpanded}
          ?selected=${isSelected}
        >
          ${node.title}
          ${hasChildren ? this.renderTree(node.children) : nothing}
        </sl-tree-item>
      `
    })}`
  }

  private readonly handleTreeSelection = (event: TreeSelectionEvent): void => {
    const [item] = event.detail.selection
    if (item == null) return
    const route = item.dataset.route
    if (route == null || route === this.activeRoute) return
    this.setActiveRoute(route)
  }

  private handleBreadcrumbClick (route: string): void {
    if (route === this.activeRoute) return
    this.setActiveRoute(route)
  }

  private readonly handlePanelToggle = (): void => {
    this.panelOpen = !this.panelOpen
    this.storedPanelOpen = this.panelOpen
    this.persistState()
  }

  private renderBreadcrumbs (): TemplateResult {
    const path = this.activePath
    if (path.length === 0) {
      return html`<sl-breadcrumb></sl-breadcrumb>`
    }

    return html`
      <sl-breadcrumb>
        ${path.map((node, index) => {
          const isLast = index === path.length - 1
          const handleClick = isLast ? undefined : () => this.handleBreadcrumbClick(node.route)
          return html`
            <sl-breadcrumb-item
              aria-current=${isLast ? 'page' : nothing}
              ?disabled=${isLast}
              @click=${handleClick}
            >
              ${node.title}
            </sl-breadcrumb-item>
          `
        })}
      </sl-breadcrumb>
    `
  }

  render (): TemplateResult {
    const shellClass = this.panelOpen ? 'content-shell panel-open' : 'content-shell panel-collapsed'

    const navigation = this.panelOpen
      ? html`
          <nav
            class="tree-panel"
            aria-label="Site navigation"
          >
            <div class="tree-scroll-container">
              <sl-tree
                selection="single"
                tabindex="0"
                @sl-selection-change=${this.handleTreeSelection}
                @sl-expand=${this.handleTreeExpand}
                @sl-collapse=${this.handleTreeCollapse}
              >
                ${this.renderTree(this.routeTree)}
              </sl-tree>
            </div>
          </nav>
        `
      : nothing

    return html`
      <div class="page-shell">
        <header class="page-header">
          <h1>${this.title}</h1>
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

        <div class=${shellClass}>
          ${navigation}

          <div class="content-panel">
            <slot @slotchange=${this.refreshPages}></slot>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tbx-router': TbxRouter
  }
}
