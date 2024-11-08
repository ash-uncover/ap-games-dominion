import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Stores
import GameSlice from '../../store/game/game.slice'
import GameSelectors from '../../store/game/game.selectors'
import { UnitOrders } from '../../lib/model/constants/UnitOrder'
// CSS
import './GameHeader.css'

interface GameHeaderProperties {
}

export const GameHeader = ({
}: GameHeaderProperties) => {

  // #region Hooks
  const dispatch = useDispatch()

  const [ended, setEnded]= useState(false)

  const turn = useSelector(GameSelectors.turn)
  const player = useSelector(GameSelectors.playerCurrent)
  const unitsCurrent = useSelector(GameSelectors.unitsCurrent)

  useEffect(() => {
    setEnded(unitsCurrent.every(unit => Boolean(unit.order) && unit.order.key !== UnitOrders.NONE))
  }, [unitsCurrent])
  // #endregion

  // #region Events
  function handleEndTurnClick() {
    dispatch(GameSlice.actions.endTurn())
  }
  // #endregion

  // #region Rendering
  return (
      <header className='ap-dom-game-header'>
        {`Turn n°${turn} - ${player?.name}`}
        <button 
          disabled={!ended}
          onClick={handleEndTurnClick}
        >
          End Turn
        </button>
      </header>
  )
  // #endregion
}
