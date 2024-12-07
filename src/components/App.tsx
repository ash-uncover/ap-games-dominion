import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
// CSS
import './App.css'
import { GameSettingsContext } from './commons/GameSettingsProvider';

interface AppProperties extends PropsWithChildren { }

export const App = ({
  children
}: AppProperties) => {

  // #region Hooks
  const settingsContext = useContext(GameSettingsContext)
  const [style, setStyle] = useState({})
  useEffect(() => {
    const {
      brightness,
      contrast
    } = settingsContext
    setStyle({
      filter: `brightness(${brightness / 100}) contrast(${contrast / 100})`
    })
  }, [settingsContext])
  // #endregion

  // #region Rendering
  return (
    <div
      className='ap-dom-app'
      style={style}
    >
      {children}
      <AppCredits />
    </div>
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