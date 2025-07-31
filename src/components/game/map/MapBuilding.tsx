import React from 'react'
import { useSelector } from 'react-redux'
// Utils
import GameSelectors from '../../../store/game/game.selectors'
import { NATIONS } from '../../../lib/data/nations'
// CSS
import './MapBuilding.css'

interface MapBuildingProperties {
  id: string
}

export const MapBuilding = ({
  id
}: MapBuildingProperties) => {

  // #region > Hooks
  const building = useSelector(GameSelectors.building(id))
  const player = useSelector(GameSelectors.player(building.player))
  // #endregion


  // #region > Render
  const classes = ['ap-dom-map-building']
  return (
    <div 
      style={{
        background: NATIONS[player.nation].color
      }}
      className={classes.join(' ')}
    >
      
    </div>
  )
  // #endregion
}
