import React from 'react'
import { PlayerType } from '../../../lib/model/constants/PlayerType'
import { PlayerLevel } from '../../../lib/model/constants/PlayerLevel'
import { PayloadGameInfoPutPlayer } from '../../../lib/model/payload/PayloadGameInfoPut'
// CSS
import './GameSetupPlayer.css'
import { Button, Input } from '@sol.ac/react-commons'

interface GameSetupPlayerProperties {
  name: string
  nation: string
  type: PlayerType
  level: PlayerLevel
  onChange: (player: PayloadGameInfoPutPlayer) => void
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

  // #region > Hooks
  // #endregion

  // #region > Events
  function handleNameChange(event: { value: string }) {
    onChange({
      name: event.value,
      nation,
      type,
      level
    })
  }
  function handleNationChange(event: { value: string }) {
    onChange({
      name,
      nation: event.value,
      type,
      level
    })
  }
  function handleDeleteClick() {
    onDelete()
  }
  // #endregion

  // #region > Render
  return (
    <div className='ap-dom-game-setup-player'>
      <div className='ap-dom-game-setup-player__section'>
        <label>Name</label>
        <Input
          value={name}
          onChange={handleNameChange}
        />
      </div>
      
      <div className='ap-dom-game-setup-player__section'>
        <label>Nation</label>
        <Input
          value={nation || ''}
          onChange={handleNationChange}
        />
      </div>

      <Button
        className='ap-dom-game-setup-player__section'
        onClick={handleDeleteClick}
      >
        del
      </Button>
    </div>
  )
  // #endregion
}


