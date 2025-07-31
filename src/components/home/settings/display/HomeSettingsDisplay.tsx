import React from 'react'
import * as ReactI18n from 'react-i18next'
import {
  Panel,
  GameSettingDisplayBrightnessSlider,
  GameSettingDisplayContrastSlider
} from '@sol.ac/games-common'
// CSS
import './HomeSettingsDisplay.css'

// #region Declaration
interface HomeSettingsDisplayProperties {

}
// #endregion

// #region Component
export const HomeSettingsDisplay = ({
}: HomeSettingsDisplayProperties) => {

  // #region > Hooks
  const { t } = ReactI18n.useTranslation()
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
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
    </main>
  )
  // #endregion
}
// #endregion