import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// Utils
import GameSelectors from '../../../store/game/game.selectors'
// Components
import { Panel } from '../../../lib/components/Panel'
import { UnitsPanelUnit } from './UnitsPanelUnit'
// CSS
import './UnitsPanel.css'

interface UnitsPanelProperties {}

export const UnitsPanel = ({
}: UnitsPanelProperties) => {

  // #region Hooks //
  const [show, setShow] = useState<boolean>(false)
  
  const selectedTile = useSelector(GameSelectors.selectedTile)
  const selectedUnits = useSelector(GameSelectors.selectedUnits)
  const tile = useSelector(GameSelectors.tile(selectedTile))

  useEffect(() => {
    if (tile && selectedUnits.length) {
      setShow(tile.units.includes(selectedUnits[0]))
    } else {
      setShow(false)
    }
  }, [selectedTile, selectedUnits, tile])
  // #endregion

  // #region Events
  function handleClose() {
    setShow(false)
  }
  // #endregion

  // Rendering //
  if (!show) {
    return null
  }

  const classes = ['ap-dom-units-panel']
  return (
    <Panel
      className={classes.join(' ')}
      closable
      title={'Units'}
      onClose={handleClose}
    >
      <ul>
        {tile.units.map(unit => {
          return <UnitsPanelUnit key={unit} id={unit} />
        })}
      </ul>
    </Panel>
  )
  // #endregion
}
