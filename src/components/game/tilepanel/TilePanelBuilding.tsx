import React from 'react'
import { useSelector } from 'react-redux'
import GameSelectors from '../../../store/game/game.selectors'

interface TilePanelBuildingProperties {
  id: string
}

export const TilePanelBuilding = ({
  id
}: TilePanelBuildingProperties) => {

  // #region Hooks //
  const building = useSelector(GameSelectors.building(id))
  const player = useSelector(GameSelectors.player(building.player))
  // #endregion

  // #region Events
  // #endregion

  // Rendering //
  const classes = ['ap-dom-tile-panel-building']
  return (
    <li
      className={classes.join(' ')}
    >
      {building.name} - {player.name}
    </li>
  )
  // #endregion
}
