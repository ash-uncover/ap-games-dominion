import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
// CSS
import './HomePlayLoad.css'

// #region Declaration
interface HomePlayLoadProperties {
}
// #endregion

// #region Component
export const HomePlayLoad = ({
}: HomePlayLoadProperties) => {

  // #region > Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <main className='ap-dom-home-play-load'>
      LOAD GAME      
    </main>
  )
  // #endregion
}
// #endregion