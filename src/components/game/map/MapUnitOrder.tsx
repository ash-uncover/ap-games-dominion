import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import GameSelectors from '../../../store/game/game.selectors'
import { UnitOrders } from '../../../lib/model/constants/UnitOrder'
import { angle, distance, tile2point } from '../../../lib/utils/geometry'
// CSS
import './MapUnitOrder.css'

interface MapUnitOrderProperties {
  id: string
}

export const MapUnitOrder = ({
  id
}: MapUnitOrderProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const unit = useSelector(GameSelectors.unit(id))
  const tile = useSelector(GameSelectors.tile(unit.tile))
  // #endregion

  // #region Rendering
  const oddRow = (tile.y % 2) === 1
  const classes = ['ap-dom-map-unit-order']
  switch (unit.order?.key) {
    case UnitOrders.MOVE: {
      classes.push('ap-dom-map-unit-order--move')
      const tilePoint = tile2point(tile)
      const orderPoint = tile2point(unit.order.data)
      const width = distance(tilePoint, orderPoint)
      const height = 1
      const rotate = angle(tilePoint, orderPoint)
      return (
        <div 
          className={classes.join(' ')}
          style={{
            width: `${Math.max(6, width * 10 - 6)}rem`,
            height: `${height}rem`,
            translate: `${tile.x * 10 + (oddRow ? 10 : 5)}rem ${tile.y * 10 + 5}rem`,
            rotate: `${rotate}deg`,
          }}
        >
          <div className='ap-dom-map-unit-order--move_inner'>

          </div>
        </div>
      )
    }
    default: {
      return null
    }
  }
  // #endregion
}
