import React from 'react'
import { MenuItem } from '@sol.ac/games-common'
// CSS
import './HomePlay.css'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

interface HomePlayProperties {
}

export const HomePlay = ({
}: HomePlayProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-play'>
      <ul>
        <MenuItem
          text={t('home.play.new.menu')}
          onClick={() => { navigate('new') }}
        />
        <MenuItem
          text={t('home.play.online.menu')}
          onClick={() => { navigate('online') }}
        />
        <MenuItem
          text={t('home.play.load.menu')}
          onClick={() => { navigate('load') }}
        />
        <MenuItem
          text={t('BACK')}
          onClick={() => { navigate('/') }}
        />
      </ul>
    </main>
  )
  // #endregion
}
