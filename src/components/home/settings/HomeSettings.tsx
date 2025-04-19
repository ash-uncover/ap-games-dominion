import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@sol.ac/games-common'
// CSS
import './HomeSettings.css'

interface HomeSettingsProperties {
}

export const HomeSettings = ({
}: HomeSettingsProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-settings'>
      <ul>
        <MenuItem
          text={t('home.settings.game.menu')}
          onClick={() => { navigate('game') }}
        />
        <MenuItem
          text={t('home.settings.display.menu')}
          onClick={() => { navigate('display') }}
        />
        <MenuItem
          text={t('home.settings.audio.menu')}
          onClick={() => { navigate('audio') }}
        />
        <MenuItem
          text={t('BACK')}
          onClick={() => { navigate('../') }}
        />
      </ul>
    </main>
  )
  // #endregion
}
