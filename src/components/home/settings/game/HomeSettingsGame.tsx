import React from 'react'
import { MenuItem } from '@uncover/games-common'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
// CSS
import './HomeSettingsGame.css'

interface HomeSettingsGameProperties {
}

export const HomeSettingsGame = ({
}: HomeSettingsGameProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-settings-game'>
      SETTINGS GAME
      <button
        onClick={() => { navigate('/settings') }}
      >
        {t('BACK')}
      </button>
    </main>
  )
  // #endregion
}
