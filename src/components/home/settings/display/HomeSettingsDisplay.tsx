import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  Panel,
  GameSettingDisplayBrightnessSlider,
  GameSettingDisplayContrastSlider
} from '@uncover/games-common'
// CSS
import './HomeSettingsDisplay.css'

interface HomeSettingsDisplayProperties {}
export const HomeSettingsDisplay = ({
}: HomeSettingsDisplayProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-settings-display'>
      <Panel>
        <h2>
          {t('home.settings.display.title')}
        </h2>
      </Panel>

      <Panel title={t('home.settings.display.brightness.title')}>
        <GameSettingDisplayBrightnessSlider
          label={t('home.settings.display.brightness.title')}
        />
      </Panel>

      <Panel title={t('home.settings.display.contrast.title')}>
        <GameSettingDisplayContrastSlider
          label={t('home.settings.display.contrast.title')}
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
