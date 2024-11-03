import React from 'react'
import { useSelector } from 'react-redux'
import GameSelectors from '../../../store/game/game.selectors'

interface TilePanelUnitProperties {
  id: string
}

export const TilePanelUnit = ({
  id
}: TilePanelUnitProperties) => {

  // #region Hooks //
  const unit = useSelector(GameSelectors.unit(id))
  const player = useSelector(GameSelectors.player(unit.owner))
  // #endregion

  // #region Events
  // #endregion

  // Rendering //
  const classes = ['ap-dom-tile-panel-unit']
  return (
    <li
      className={classes.join(' ')}
    >
      {unit.name} - {player.name}
    </li>
  )
  // #endregion
}
