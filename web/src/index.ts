// Styles
import './global.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'
import '@xterm/xterm/css/xterm.css'

// Shoelace Components
import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js'

// Internal Components
import './chart'
import './console'
import './form'
import './grid'
import './markdown'
import './clock'
import './theme-toggle'
import './page-menu'

// Configure Shoelace asset lookup (icons, etc.)
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/dist/')
