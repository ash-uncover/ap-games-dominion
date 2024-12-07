import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@uncover/games-common'
// CSS
import './HomeIndex.css'

interface HomeIndexProperties {
}

export const HomeIndex = ({
}: HomeIndexProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-index'>
      <ul>
        <MenuItem
          text={t('home.play.menu')}
          onClick={() => { navigate('play') }}
        />
        <MenuItem
          text={t('home.settings.menu')}
          onClick={() => { navigate('settings') }}
        />
        <MenuItem
          text={t('home.credits.menu')}
          onClick={() => { navigate('credits') }}
        />
      </ul>
    </main>
  )
  // #endregion
}
