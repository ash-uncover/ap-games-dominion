import React from 'react'

import {
  Route,
  Routes,
} from 'react-router-dom'

import { App } from '../components/App'

export const RouteRoot = () => {

  // #region Rendering
  return (
    <Routes>
      <Route path='*' element={<App />}>
      </Route>
    </Routes>
  )
  // #endregion
}