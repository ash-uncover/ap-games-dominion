import React from 'react'
import { useSelector } from 'react-redux'
//
import GameSelectors from '../../../store/game/game.selectors'
import { UnitsPanelUnit } from './UnitsPanelUnit'
// CSS
import './UnitsPanel.css'
import { Panel } from '@sol.ac/react-commons'

interface UnitsPanelProperties {}

export const UnitsPanel = ({
}: UnitsPanelProperties) => {

  // #region > Hooks //
  const [show, setShow] = React.useState<boolean>(false)
  
  const selectedTile = useSelector(GameSelectors.selectedTile)
  const selectedUnits = useSelector(GameSelectors.selectedUnits)
  const tile = useSelector(GameSelectors.tile(selectedTile))

  React.useEffect(() => {
    if (tile && selectedUnits.length) {
      setShow(tile.units.includes(selectedUnits[0]))
    } else {
      setShow(false)
    }
  }, [selectedTile, selectedUnits, tile])
  // #endregion

  // #region > Events
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
      title={'Units'}
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
