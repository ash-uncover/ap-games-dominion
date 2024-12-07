import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  Panel,
  Slider
} from '@uncover/games-common'
import {
  GameSettingsActions,
  GameSettingsContext,
  GameSettingsDispatchContext
} from '../../../commons/GameSettingsProvider'
// CSS
import './HomeSettingsVideo.css'

interface HomeSettingsVideoProperties {
}

export const HomeSettingsVideo = ({
}: HomeSettingsVideoProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  const settingsContext = useContext(GameSettingsContext)
  const dispatch = useContext(GameSettingsDispatchContext);
  // #endregion

  // #region Events
  function handleBrightnessChange(brightness: number) {
    const action = GameSettingsActions.setBrightness(brightness)
    dispatch(action)
  }
  function handleContrastChange(contrast: number) {
    const action = GameSettingsActions.setContrast(contrast)
    dispatch(action)
  }
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-settings-video'>
      <Panel>
        <h2>
          {t('home.settings.display.title')}
        </h2>
      </Panel>

      <Panel title={t('home.settings.display.brightness.title')}>
        <Slider
          label={t('home.settings.display.brightness.title')}
          min={0}
          max={100}
          value={settingsContext.brightness}
          onChange={handleBrightnessChange}
        />
      </Panel>

      <Panel title={t('home.settings.display.contrast.title')}>
        <Slider
          label={t('home.settings.display.contrast.title')}
          min={0}
          max={100}
          value={settingsContext.contrast}
          onChange={handleContrastChange}
        />
      </Panel>

      <button
        onClick={() => { navigate('/settings') }}
      >
        {t('BACK')}
      </button>
    </main>
  )
  // #endregion
}
