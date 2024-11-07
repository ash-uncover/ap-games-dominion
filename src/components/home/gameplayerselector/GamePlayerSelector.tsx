import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import { DataStates } from '@uncover/js-utils'
import GamesSelectors from '../../../store/games/games.selectors'
import { GameService, loadGames } from '../../../service/games/GameService'
// CSS
import './GamePlayerSelector.css'

interface GamePlayerSelectorProperties {
  service: GameService
}
export const GamePlayerSelector = ({
  service
}: GamePlayerSelectorProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { gameId } = useParams()
  
  const state = useSelector(GamesSelectors.getGamesState)
  const game = useSelector(GamesSelectors.game(gameId))

  useEffect(() => {
    if (state === DataStates.NEVER) {
      loadGames(service, dispatch)
    }
  }, [state])
  // #endregion

  // #region Events
  function handlePlayerClick(playerName) {
    navigate(`/games/${gameId}/player/${playerName}`)
  }
  function handleCancelClick() {
    navigate('/games')
  }
  // #endregion

  // #region Rendering
  if (state === DataStates.NEVER || state === DataStates.FETCHING_FIRST || state === DataStates.FETCHING) {
    return (
      <div className='ap-dom-game-player-selector'>
        Loading
      </div>
    )
  }

  if (!game || state !== DataStates.SUCCESS) {
    return (
      <div className='ap-dom-game-player-selector'>
          <button 
            onClick={handleCancelClick}
          >
            {`Error finding game ${gameId}. Back to list.`}
          </button>
      </div>
    )
  }
  
  return (
    <div className='ap-dom-game-player-selector'>
      <div>
        <h2>Players</h2>
        {Object.values(game.players).map(player => {
          return (
            <div key={player.name}>
              <button 
                
                onClick={() => handlePlayerClick(player.name)}
              >
                {player.name}
              </button>
            </div>
          )
        })}
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


