import React, { createContext, ReactNode, useEffect, useReducer } from 'react'
import { GameSettingsModel, getDefaultGameSettings } from './GameSettingsModel'

// #region Context
export const GameSettingsContext = createContext<GameSettingsModel>({
  ...getDefaultGameSettings()
})
export const GameSettingsDispatchContext = createContext<React.Dispatch<any>>(
  () => {}
)
// #endregion

// #region Storage
const storeContext = (name: string, settings: GameSettingsModel) => {
  localStorage.setItem(`${name}-settings`, JSON.stringify(settings))
}
const loadContext = (name: string) => {
  return JSON.parse(localStorage.getItem(`${name}-settings`) || '{}')
}
// #endregion

// #region Provider
export interface GameSettingsProviderProperties {
  name: string
  children: ReactNode
}
export const GameSettingsProvider = ({
  name,
  children
}: GameSettingsProviderProperties) => {

  // #region > Hooks
  const [settings, dispatch] = useReducer(
    settingsReducer,
    {
      ...getDefaultGameSettings(),
      ...loadContext(name)
    }
  )
  useEffect(() => {
    storeContext(name, settings)
  }, [settings])
  // #endregion

  // #region > Rendering
  return (
    <GameSettingsContext.Provider value={settings}>
      <GameSettingsDispatchContext.Provider value={dispatch}>
        {children}
      </GameSettingsDispatchContext.Provider>
    </GameSettingsContext.Provider>
  )
  // #endregion
}
// #endregion

// #region Reducer
const SET_BRIGHTNESS = 'SET_BRIGHTNESS'
function setBrightness(brightness: number) {
  return {
    type: SET_BRIGHTNESS,
    brightness
  }
}
const SET_CONTRAST = 'SET_CONTRAST'
function setContrast(contrast: number) {
  return {
    type: SET_CONTRAST,
    contrast: contrast
  }
}
export const GameSettingsActions = {
  setBrightness,
  setContrast
}
function settingsReducer(settings: GameSettingsModel, action: any) {
  switch (action.type) {
    case SET_BRIGHTNESS: {
      return {
        ...settings,
        brightness: action.brightness
      }
    }
    case SET_CONTRAST: {
      return {
        ...settings,
        contrast: action.contrast
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
// #endregion