import React, { PropsWithChildren } from 'react'
import { GameApp } from '@uncover/games-common';
// CSS
import './App.css'

interface AppProperties extends PropsWithChildren { }
export const App = ({
  children
}: AppProperties) => {

  // #region Hooks
  // #endregion

  // #region Rendering
  return (
    <GameApp
      className='ap-dom-app'
      name='ap-dom'
    >
      {children}
      <AppCredits />
    </GameApp>
  )
  // #endregion
}

export const AppCredits = () => {

  // #region Rendering
  return (
    <div className='ap-dom-app_credits'>
      @aSHuncover 2024
    </div>
  )
  // #endregion
}