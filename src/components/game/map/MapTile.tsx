import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import GameSelectors from '../../../store/game/game.selectors'
import GameSlice from '../../../store/game/game.slice'
import { UnitOrder } from '../../../lib/model/constants/UnitOrder'
// Components
import { MapBuilding } from './MapBuilding'
import { MapUnit } from './MapUnit'
// CSS
import './MapTile.css'

interface MapTileProperties {
  id: string
}

export const MapTile = ({
  id
}: MapTileProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const tile = useSelector(GameSelectors.tile(id))
  const selectedUnits = useSelector(GameSelectors.selectedUnits)
  useEffect(() => {
    if (ref.current) {
      const oddRow = (tile.y % 2) === 1
      ref.current.style.translate = `${tile.x * 100 + (oddRow ? 50 : 0)}% ${tile.y * 100}%`
    }
  }, [tile])
  // #endregion

  // #region Events
  function handleClick() {
    dispatch(GameSlice.actions.selectTile({ id }))
  }
  function handleContextMenu() {
    selectedUnits.forEach(id => {
      dispatch(GameSlice.actions.setUnitOrder({
        id, 
        key: UnitOrder.MOVE,
        data: {
          x: tile.x,
          y: tile.y,
        }
      }))
    })
  }
  // #endregion

  // #region Rendering
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
      ref={ref}
      className={classes.join(' ')}
      draggable={false}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className='ap-dom-map-tile_buildings'>
        {tile.buildings.map(building => (
          <MapBuilding key={building} id={building} />
        ))}
      </div>
      <div className='ap-dom-map-tile_units'>
        {tile.units.map(unit => (
          <MapUnit key={unit} id={unit} />
        ))}
      </div>
    </div>
  )
  // #endregion
}
