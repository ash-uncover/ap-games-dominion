import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@uncover/games-common'
// CSS
import './HomePlayLoad.css'

interface HomePlayLoadProperties {
}

export const HomePlayLoad = ({
}: HomePlayLoadProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-play-load'>
      LOAD GAME
      <button
        onClick={() => { navigate('/play') }}
      >
        {t('BACK')}
      </button>
    </main>
  )
  // #endregion
}
