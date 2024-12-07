import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
// CSS
import './HomeCredits.css'

interface HomeCreditsProperties {
}

export const HomeCredits = ({
}: HomeCreditsProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-index-credits'>
      CREDITS
      <button
        onClick={() => { navigate('/') }}
      >
        {t('BACK')}
      </button>
    </main>
  )
  // #endregion
}
