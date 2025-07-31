import React from 'react'
import { useTranslation } from 'react-i18next'
// CSS
import './HomeCredits.css'

// #region Declaration
interface HomeCreditsProperties {
}
// #endregion

// #region Component
export const HomeCredits = ({
}: HomeCreditsProperties) => {

  // #region > Hooks
  const { t } = useTranslation()
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <main className='ap-dom-home-credits'>
      CREDITS
    </main>
  )
  // #endregion
}
