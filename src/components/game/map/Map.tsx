import React from 'react'
import { useSelector } from 'react-redux'
// Utils
import GameSelectors from '../../../store/game/game.selectors'
import { MapTile } from './MapTile'
// CSS
import './Map.css'

interface MapProperties {
}

export const Map = ({
}: MapProperties) => {

  // #region Hooks
  const map = useSelector(GameSelectors.map)
  // #endregion

  // #region Rendering
  return (
    <div 
      className='ap-dom-map'
      draggable={false}
    >
      {map.tiles.map((row: string[], index: number) => {
        const classesRow = ['ap-dom-map_row']
        if (index % 2) {
          classesRow.push('ap-dom-map_row--even')
        } else {
          classesRow.push('ap-dom-map_row--odd')
        }
        return (
          <div 
            key={`row-${index}`} 
            className={classesRow.join(' ')}
            draggable={false}
          >
            {row.map((id: string) => {
              return (
                <MapTile key={id} id={id} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
  // #endregion
}
