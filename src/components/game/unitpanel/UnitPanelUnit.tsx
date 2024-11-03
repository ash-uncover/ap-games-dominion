import React from 'react'
import { useSelector } from 'react-redux'
import GameSelectors from '../../../store/game/game.selectors'

interface UnitPanelUnitProperties {
  id: string
}

export const UnitPanelUnit = ({
  id
}: UnitPanelUnitProperties) => {

  // #region Hooks //
  const unit = useSelector(GameSelectors.unit(id))
  const player = useSelector(GameSelectors.player(unit.owner))
  // #endregion

  // #region Events
  // #endregion

  // Rendering //
  const classes = ['ap-dom-unit-panel-unit']
  return (
    <li
      className={classes.join(' ')}
    >
      {unit.name} - {player.name}
    </li>
  )
  // #endregion
}
