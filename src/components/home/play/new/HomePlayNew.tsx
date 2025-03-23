import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { GameSetup } from '../../../commons/gamesetup/GameSetup'
import { GameLocalService } from '../../../../service/GameLocalService'
// CSS
import './HomePlayNew.css'

interface HomePlayNewProperties {}
export const HomePlayNew = ({
}: HomePlayNewProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  function handleCreateGame() {

  }
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-play-new'>
      <GameSetup
        service={GameLocalService}
        onCreateGame={handleCreateGame}
      />
      <button
        onClick={() => { navigate('/play') }}
      >
        {t('BACK')}
      </button>
    </main>
  )
  // #endregion
}
