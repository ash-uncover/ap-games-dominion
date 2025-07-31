import React from 'react'
import * as ReactI18n from 'react-i18next'
// CSS
import './HomeSettingsGame.css'

// #region Declaration
interface HomeSettingsGameProperties {
}
// #endregion

// #region Component
export const HomeSettingsGame = ({
}: HomeSettingsGameProperties) => {

  // #region > Hooks
  const { t } = ReactI18n.useTranslation()
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <main className='ap-dom-home-settings-game'>
      SETTINGS GAME
    </main>
  )
  // #endregion
}
// #endregion
