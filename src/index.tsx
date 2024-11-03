import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  BrowserRouter,
  HashRouter,
} from 'react-router-dom'

// Import translation module
import 'lib/utils/i18n'

// Import icons
import 'lib/utils/icons'

// Should be imported before first access to the reducers
import { store } from './store'

// Import components
import { RouteRoot } from './routes'
import { CONFIG } from './config'
import { ShortcutManager } from '@uncover/games-common'
import { WardDevTools, WardProvider } from '@uncover/ward-react'

ShortcutManager.reset()

let Router = BrowserRouter
if (CONFIG.AP_GAMES_DOMINION_ENVIRONMENT === 'github') {
  Router = HashRouter
}

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <WardProvider plugin={CONFIG.AP_GAMES_DOMINION_PLUGIN}>
    <Provider store={store}>
      <Router>
        <RouteRoot />
      </Router>
    </Provider>
    {CONFIG.AP_GAMES_DOMINION_ENVIRONMENT === 'local' ?
      <WardDevTools />
      : null}
  </WardProvider>
)
