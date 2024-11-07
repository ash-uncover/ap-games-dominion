import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import { DataStates } from '@uncover/js-utils'
import GamesSelectors from '../../../store/games/games.selectors'
import { GameService, loadGames, deleteGame } from '../../../service/games/GameService'
// CSS
import './GamePlayerSelector.css'

interface GamePlayerSelectorProperties {
  service: GameService
}
export const GamePlayerSelector = ({
  service
}: GamePlayerSelectorProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { gameId } = useParams()
  // #endregion

  // #region Events
  function handleCancelClick() {
    navigate('/games')
  }
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-game-player-selector'>
      Selector {gameId}
      <div>
        <button 
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  )
  // #endregion
}


