import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { GameSetup } from '../../../commons/gamesetup/GameSetup'
import { GameLocalService } from '../../../../service/GameLocalService'
// CSS
import './HomePlayNew.css'

// #region Delcaration
interface HomePlayNewProperties {}
// #endregion

// #region Component
export const HomePlayNew = ({
}: HomePlayNewProperties) => {

  // #region > Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region > Events
  function handleCreateGame() {

  }
  // #endregion

  // #region > Render
  return (
    <main className='ap-dom-home-play-new'>
      <GameSetup
        service={GameLocalService}
        onCreateGame={handleCreateGame}
      />
    </main>
  )
  // #endregion
}
// #endregion