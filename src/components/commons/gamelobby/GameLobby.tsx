import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import { DataStates } from '@sol.ac/js-utils'
import GamesSelectors from '../../../store/games/games.selectors'
import { getGame, postGameTurn } from '../../../service/GameServiceHelper'
import { GameService } from '../../../service/GameService'
import { GameStatus } from '../../../lib/model/constants/GameStatus'
import { GameLobbyPlayer } from './GameLobbyPlayer'
// CSS
import './GameLobby.css'

interface GameLobbyProperties {
  service: GameService
}
export const GameLobby = ({
  service
}: GameLobbyProperties) => {

  // #region > Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { gameId } = useParams()

  const gamesState = useSelector(GamesSelectors.getGamesState)
  const gameData = useSelector(GamesSelectors.game(gameId))

  useEffect(() => {
    if (gamesState === DataStates.NEVER || !gameData) {
      getGame(service, dispatch, gameId)
    }
  }, [gamesState, gameData])
  // #endregion

  // #region > Events
  function handlePlayerClick(playerId: string) {
    navigate(`/games/${gameId}/player/${playerId}`)
  }
  function handleHostClick() {
    postGameTurn(service, dispatch, gameId)
  }
  function handleBackClick() {
    navigate('/games')
  }
  // #endregion

  // #region > Render
  if (gamesState === DataStates.NEVER || gamesState === DataStates.FETCHING_FIRST || gamesState === DataStates.FETCHING) {
    return (
      <div className='ap-dom-game-lobby'>
        Loading
      </div>
    )
  }

  if (!gameData || gamesState !== DataStates.SUCCESS) {
    return (
      <div className='ap-dom-game-lobby'>
          <button
            onClick={handleBackClick}
          >
            {`Error finding game ${gameId}. Back to list.`}
          </button>
      </div>
    )
  }

  return (
    <div className='ap-dom-game-lobby'>
      <h2>{`Game '${gameData.name}' - Turn ${gameData.turn}`}</h2>
      <h2>Players</h2>
      {Object.values(gameData.players).map(player => {
        return (
          <GameLobbyPlayer
            key={player.id}
            gameId={gameId}
            playerId={player.id}
            onClick={() => handlePlayerClick(player.id)}
          />
        )
      })}
      <div>
        {gameData.status === GameStatus.STARTED ?
          <button onClick={handleHostClick}>
            Host Turn
          </button>
        : null}
        <button onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  )
  // #endregion
}


