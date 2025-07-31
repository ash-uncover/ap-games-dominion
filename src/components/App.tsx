import React from 'react'
import { GameApp } from '@sol.ac/games-common'
//
import { AppCredits } from './AppCredits'
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

