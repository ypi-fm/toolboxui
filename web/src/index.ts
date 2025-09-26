import { startClock } from './controllers'

// Styles
import './global.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
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
import './testelement' // TODO: remove entirely, replace with clock component perhaps?

// Controllers
startClock()
