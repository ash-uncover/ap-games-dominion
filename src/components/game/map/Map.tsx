import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
// Utils
import GameSelectors from '../../../store/game/game.selectors'
import { MapTile } from './MapTile'
// CSS
import './Map.css'
import { MapUnitOrder } from './MapUnitOrder'

interface MapProperties {
}

export const Map = ({
}: MapProperties) => {

  // #region Hooks
  const ref = useRef<HTMLDivElement>(null)
  const map = useSelector(GameSelectors.map)
  const playerCurrent = useSelector(GameSelectors.playerCurrent)
  useEffect(() => {
    if (ref.current) {
      ref.current.style.width = `${10 * map.width}rem`
      ref.current.style.height = `${10 * map.height}rem`
    }
  }, [map])
  // #endregion

  // #region Rendering
  return (
    <div 
      ref={ref}
      className='ap-dom-map'
      draggable={false}
    >
      {map.tiles.map(
        (row: string[]) => row.map(
          (id: string) => (
            <MapTile key={id} id={id} />
          )
        )        
      )}
      {playerCurrent && playerCurrent.units.map(
        (unit: string) => (
          <MapUnitOrder key={unit} id={unit} />
        )
      )}
    </div>
  )
  // #endregion
}
