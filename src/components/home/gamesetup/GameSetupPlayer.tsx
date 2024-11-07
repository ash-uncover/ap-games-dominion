import React from 'react'
import { PlayerSetupDefinition } from './GameSetup'
// CSS
import './GameSetupPlayer.css'

interface GameSetupPlayerProperties {
  name: string
  nation: string
  onChange: (player: PlayerSetupDefinition) => void
  onDelete: () => void
}

export const GameSetupPlayer = ({
  name,
  nation,
  onChange,
  onDelete
}: GameSetupPlayerProperties) => {

  // #region Hooks
  // #endregion

  // #region Events
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      name: event.target.value,
      nation
    })
  }
  function handleNationChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      name,
      nation: event.target.value
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


