import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Stores
import GameSlice from '../../store/game/game.slice'
import GameSelectors from '../../store/game/game.selectors'
import { putGameTurn } from '../../service/GameServiceHelper'
import { GameService } from '../../service/GameService'
import { UnitOrder } from '../../lib/model/constants/UnitOrder'
import { PayloadGameTurnOrdersPut } from '../../lib/model/payload/PayloadGameTurnOrdersPut'
import { PlayerTurnState } from '../../lib/model/constants/PlayerTurnState'
// CSS
import './GameHeader.css'
import { useNavigate } from 'react-router'

type EndState =
  | 'INCOMPLETE'
  | 'COMPLETE'
const EndStates: {
  INCOMPLETE: EndState
  COMPLETE: EndState
} = {
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE'
}

interface GameHeaderProperties {
  service: GameService
}

export const GameHeader = ({
  service
}: GameHeaderProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [endState, setEndState]= useState(EndStates.INCOMPLETE)

  const gameId = useSelector(GameSelectors.gameId)
  const playerId = useSelector(GameSelectors.playerId)
  const turn = useSelector(GameSelectors.turn)
  const player = useSelector(GameSelectors.playerCurrent)
  const unitsCurrent = useSelector(GameSelectors.unitsCurrent)

  useEffect(() => {
    const unitOrdersGiven = unitsCurrent.every(unit => Boolean(unit.order) && unit.order.key !== UnitOrder.NONE)
    setEndState(unitOrdersGiven ? EndStates.COMPLETE : EndStates.INCOMPLETE)
  }, [unitsCurrent])
  // #endregion

  // #region Events
  function handleEndTurnClick() {
    const orders: PayloadGameTurnOrdersPut = {
      gameId,
      playerId,
      turn,
      status: PlayerTurnState.VALIDATED,

      unitOrders: unitsCurrent.map(
        unit => ({
          unitId: unit.id,
          ...unit.order
        })
      )
    }
    putGameTurn(service, dispatch, gameId, playerId, orders)
      .then(() => navigate(`/games/${gameId}`))
  }
  // #endregion

  // #region Rendering
  const classesButtonEnd = ['ap-dom-game-header_button-end']
  if (endState === EndStates.COMPLETE) {
    classesButtonEnd.push('ap-dom-game-header_button-end--complete')
  } else {
    classesButtonEnd.push('ap-dom-game-header_button-end--incomplete')
  }
  return (
      <header className='ap-dom-game-header'>
        {`Turn n°${turn} - ${player?.name}`}
        <button
          className={classesButtonEnd.join(' ')}
          onClick={handleEndTurnClick}
        >
          End Turn
        </button>
      </header>
  )
  // #endregion
}
