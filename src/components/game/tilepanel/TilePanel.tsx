import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GameSelectors from '../../../store/game/game.selectors'
import { Panel } from '../../../lib/components/Panel'
import { TilePanelBuilding } from './TilePanelBuilding'
import { TilePanelUnit } from './TilePanelUnit'

import './TilePanel.css'

interface TilePanelProperties {}

export const TilePanel = ({
}: TilePanelProperties) => {

  // #region Hooks //
  const [show, setShow] = useState<boolean>(false)
  
  const selectedTile = useSelector(GameSelectors.selectedTile)
  const tile = useSelector(GameSelectors.tile(selectedTile))

  useEffect(() => {
    setShow(Boolean(selectedTile))
  }, [selectedTile])
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

  const classes = ['ap-dom-tile-panel']
  return (
    <Panel
      className={classes.join(' ')}
      closable
      title={tile.id}
      onClose={handleClose}
    >
      {tile.id}
      <ul>
        Buildings
        {tile.buildings.map(building => {
          return <TilePanelBuilding key={building} id={building} />
        })}
      </ul>
      <ul>
        Units
        {tile.units.map(unit => {
          return <TilePanelUnit key={unit} id={unit} />
        })}
      </ul>
    </Panel>
  )
  // #endregion
}
