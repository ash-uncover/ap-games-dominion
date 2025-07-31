import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  BrowserRouter,
  HashRouter,
} from 'react-router'

// Import translation module
import 'lib/utils/i18n'

// Import icons
import 'lib/utils/icons'

// Should be imported before first access to the reducers
import { store } from './store'

// Import components
import { RouteRoot } from './routes'
import { CONFIG } from './config'
import { ShortcutManager } from '@sol.ac/games-common'
import { WardDevTools, WardProvider } from '@sol.ac/ward-react'
import { App } from './components/App'

ShortcutManager.reset()

let Router = BrowserRouter
if (CONFIG.AP_GAMES_DOMINION_ENVIRONMENT === 'github') {
  Router = HashRouter
}

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  // <WardProvider plugin={CONFIG.AP_GAMES_DOMINION_PLUGIN}>
    <Provider store={store}>
      <App>
        <Router>
          <RouteRoot />
        </Router>
      </App>
    </Provider>
  //   {CONFIG.AP_GAMES_DOMINION_ENVIRONMENT === 'local' ?
  //     <WardDevTools />
  //     : null}
  // </WardProvider >
)
