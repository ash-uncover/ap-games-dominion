import React from 'react'
import { useSelector } from 'react-redux'
import GameSelectors from '../../../store/game/game.selectors'
import { TilePanelBuilding } from './TilePanelBuilding'
import { TilePanelUnit } from './TilePanelUnit'

import './TilePanel.css'
import { Panel } from '@sol.ac/react-commons'

// #region Declaration
interface TilePanelProperties {

}
// #endregion

// #region Component
export const TilePanel = ({
  
}: TilePanelProperties) => {

  // #region > Hooks
  const [show, setShow] = React.useState<boolean>(false)
  
  const selectedTile = useSelector(GameSelectors.selectedTile)
  const tile = useSelector(GameSelectors.tile(selectedTile))

  React.useEffect(() => {
    setShow(Boolean(selectedTile))
  }, [selectedTile])
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  if (!show) {
    return null
  }

  const classes = ['ap-dom-tile-panel']
  return (
    <Panel
      className={classes.join(' ')}
      expandable={true}
      title={tile.id}
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
// #endregion
