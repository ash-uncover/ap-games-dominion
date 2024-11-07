import React from 'react'
import { useSelector } from 'react-redux'
import GameSelectors from '../../store/game/game.selectors'

interface GameHomeProperties {
  gameId: string
}

export const GameHome = ({
  gameId
}: GameHomeProperties) => {

  // #region Hooks
  const players = useSelector(GameSelectors.players)
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-game-home'>
      Game Home {gameId}
      {Object.values(players).map(player => {
        return (
          <div>{player.name}</div>
        )
      })}
    </div>
  )
  // #endregion
}


