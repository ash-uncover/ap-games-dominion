import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GameSelectors from '../../../store/game/game.selectors'
import GameSlice from '../../../store/game/game.slice'
import './MapTile.css'
import { MapBuilding } from './MapBuilding'
import { MapUnit } from './MapUnit'

interface MapTileProperties {
  id: string
}

export const MapTile = ({
  id
}: MapTileProperties) => {

  // #region Hooks //
  const dispatch = useDispatch()
  const tile = useSelector(GameSelectors.tile(id))
  // #endregion

  // #region Events
  function handleClick() {
    dispatch(GameSlice.actions.selectTile({ id }))
  }
  // #endregion

  // Rendering //
  const classes = ['ap-dom-map-tile']
  if ((tile.x + tile.y) % 2) {
    classes.push('ap-dom-map-tile--odd')
  } else {
    classes.push('ap-dom-map-tile--even')
  }
  if (tile.selected) {
    classes.push('ap-dom-map-tile--selected')
  }
  return (
    <div 
      className={classes.join(' ')}
      draggable={false}
      onClick={handleClick}
    >
      {tile.buildings.map(building => (
        <MapBuilding key={building} id={building} />
      ))}
      {tile.units.map(unit => (
        <MapUnit key={unit} id={unit} />
      ))}
    </div>
  )
  // #endregion
}
