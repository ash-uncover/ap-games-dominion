import React from 'react'
import { GameInfoPlayer } from '../../../lib/model/game/GameInfo'
import { PlayerType } from '../../../lib/model/constants/PlayerType'
import { PlayerLevel } from '../../../lib/model/constants/PlayerLevel'
// CSS
import './GameSetupPlayer.css'

interface GameSetupPlayerProperties {
  name: string
  nation: string
  type: PlayerType
  level: PlayerLevel
  onChange: (player: GameInfoPlayer) => void
  onDelete: () => void
}

export const GameSetupPlayer = ({
  name,
  nation,
  type,
  level,
  onChange,
  onDelete
}: GameSetupPlayerProperties) => {

  // #region Hooks
  // #endregion

  // #region Events
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      name: event.target.value,
      nation,
      type,
      level
    })
  }
  function handleNationChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      name,
      nation: event.target.value,
      type,
      level
    })
  }
  function handleDeleteClick() {
    onDelete()
  }
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-game-setup-player'>
      <label>Name</label>
      <input value={name} onChange={handleNameChange} />
      <label>Nation</label>
      <input value={nation || ''} onChange={handleNationChange} />
      <button onClick={handleDeleteClick}>del</button>
    </div>
  )
  // #endregion
}


