import React from 'react'
import { useSelector } from 'react-redux'
// Utils
import GamesSelectors from '../../../store/games/games.selectors'
// CSS
import './GameLobbyPlayer.css'

interface GameLobbyPlayerProperties {
  gameId: string
  playerId: string
  onClick: () => void
}
export const GameLobbyPlayer = ({
  gameId,
  playerId,
  onClick,
}: GameLobbyPlayerProperties) => {

  // #region Hooks
  const player = useSelector(GamesSelectors.player(gameId, playerId))
  // #endregion

  // #region Events
  function handleClick() {
    onClick()
  }
  // #endregion

  // #region Rendering

  return (
    <div className='ap-dom-game-lobby-player'>
      <button
        onClick={handleClick}
      >
        {player.name} - {player.status}
      </button>
    </div>
  )
  // #endregion
}


