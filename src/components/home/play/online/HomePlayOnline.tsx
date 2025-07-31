import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
// CSS
import './HomePlayOnline.css'

// #region Declaration
interface HomePlayOnlineProperties {
}
// #endregion

// #region Component
export const HomePlayOnline = ({
}: HomePlayOnlineProperties) => {

  // #region > Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <main className='ap-dom-home-play-online'>
      PLAY ONLINE
      <button
        onClick={() => { navigate('/play') }}
      >
        {t('BACK')}
      </button>
    </main>
  )
  // #endregion
}
// #endregion