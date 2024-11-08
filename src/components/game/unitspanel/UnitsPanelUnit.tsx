import React from 'react'
import { useSelector } from 'react-redux'
import GameSelectors from '../../../store/game/game.selectors'

interface UnitsPanelUnitProperties {
  id: string
}

export const UnitsPanelUnit = ({
  id
}: UnitsPanelUnitProperties) => {

  // #region Hooks //
  const unit = useSelector(GameSelectors.unit(id))
  const player = useSelector(GameSelectors.player(unit.player))
  // #endregion

  // #region Events
  // #endregion

  // Rendering //
  const classes = ['ap-dom-units-panel-unit']
  return (
    <li
      className={classes.join(' ')}
    >
      {unit.name} - {player.name}
    </li>
  )
  // #endregion
}
