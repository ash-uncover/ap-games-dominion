import React from 'react'

import { GameApp } from '@sol.ac/games-common';
// CSS
import './App.css'

// #region Declaration
interface AppProperties extends React.PropsWithChildren { }
// #endregion

// #region Component
export const App = ({
  children
}: AppProperties) => {

  // #region > Hooks
  // #endregion

  // #region > Render
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
// #endregion

// #region Declaration
interface AppCreditsProperties { }
// #endregion

// #region Component
export const AppCredits = ({
}: AppCreditsProperties) => {

  // #region > Render
  return (
    <div className='ap-dom-app-credits'>
      @aSHuncover 2024
    </div>
  )
  // #endregion
}
// #endregion