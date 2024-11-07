import React from 'react'
import { Outlet } from 'react-router-dom'
// CSS
import './App.css'

interface AppProperties {}

export const App = ({
}: AppProperties) => {

  // #region Hooks
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-app'>
      <Outlet />
      <div className='ap-dom-app_credits'>@aSHuncover 2024</div>
    </div>
  )
  // #endregion
}
