import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import {
  GameSettingsContext,
  GameSettingsDispatchContext,
  GameSettingsProvider,
  GameSettingsActions,
  GameApp 
} from '@uncover/games-common'
// CSS
import './App.css'

// Add this in your component file
require('react-dom');
// @ts-ignore
window.React2 = require('react');
// @ts-ignore
console.log(window.React1 === window.React2);

interface AppProperties { }

export const App = ({
}: AppProperties) => {

  // #region Hooks
  // #endregion

  // #region Rendering
  return (
    <GameSettingsProvider name='ap-dom'>
      <GameApp className='ap-dom-app'>
        <Outlet />
        <div className='ap-dom-app_credits'>
          @aSHuncover 2024
        </div>
      </GameApp>
    </GameSettingsProvider>
  )
  // #endregion
}
