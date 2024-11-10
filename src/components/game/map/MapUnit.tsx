import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NATIONS } from '../../../lib/data/nations'
import GameSelectors from '../../../store/game/game.selectors'
import GameSlice from '../../../store/game/game.slice'
import './MapUnit.css'

interface MapUnitProperties {
  id: string
}

export const MapUnit = ({
  id
}: MapUnitProperties) => {

  // #region Hooks //
  const dispatch = useDispatch()
  const unit = useSelector(GameSelectors.unit(id))
  const player = useSelector(GameSelectors.player(unit.player))
  const currentPlayer = useSelector(GameSelectors.playerId)
  // #endregion

  // #region Events
  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    dispatch(GameSlice.actions.selectTile({ id: unit.tile }))
    dispatch(GameSlice.actions.selectUnit({ id }))
  }
  // #endregion

  // Rendering //
  const classes = ['ap-dom-map-unit']
  if (unit.selected) {
    classes.push('ap-dom-map-unit--selected')
  }
  if (currentPlayer === unit.player) {
    classes.push('ap-dom-map-unit--self')
  } else {
    classes.push('ap-dom-map-unit--ennemy')
  }
  return (
    <div 
      style={{
        background: NATIONS[player.nation].color
      }}
      className={classes.join(' ')}
      draggable={false}
      onClick={handleClick}
    >
      
    </div>
  )
  // #endregion
}
