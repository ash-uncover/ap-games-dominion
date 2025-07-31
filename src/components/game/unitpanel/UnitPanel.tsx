import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import GameSelectors from '../../../store/game/game.selectors'
import GameSlice from '../../../store/game/game.slice'
import { UnitOrder } from '../../../lib/model/constants/UnitOrder'
// Components
import { Panel } from '../../../lib/components/panel/Panel'
// CSS
import './UnitPanel.css'

interface UnitPanelProperties {}

export const UnitPanel = ({
}: UnitPanelProperties) => {

  // #region > Hooks
  const dispatch = useDispatch()
  const [show, setShow] = useState<boolean>(false)
  const [actions, setActions] = useState<UnitOrder[]>([])
  const currentPlayer = useSelector(GameSelectors.playerId)
  const selectedUnits = useSelector(GameSelectors.selectedUnits)
  const unitsSelected = useSelector(GameSelectors.unitsSelected)

  useEffect(() => {
    if (unitsSelected.length && unitsSelected[0].player === currentPlayer) {
      setShow(true)
      setActions(Object.values(UnitOrder))
    } else {
      setShow(false)
      setActions([])
    }
  }, [unitsSelected, currentPlayer])
  // #endregion

  // #region > Events
  function handleActionClick(key: UnitOrder) {
    selectedUnits.forEach(id => {
      dispatch(GameSlice.actions.setUnitOrder({
        id, 
        key
      }))
    })
  }
  // #endregion

  // #region > Render
  if (!show) {
    return null
  }

  const classes = ['ap-dom-unit-panel']
  return (
    <Panel
      className={classes.join(' ')}
      title={'Actions'}      
    >
      {actions.map(
        (action: UnitOrder) => {
          const classesAction = ['ap-dom-unit-panel_action']
          const state = unitsSelected.reduce((acc, unit) => {
            if (unit.order?.key === action) {
              acc.some = true
            } else {
              acc.all = false
            }
            return acc
          }, { some: false, all: true })
          if (state.all) {
            classesAction.push('ap-dom-unit-panel_action--all')
          } else if (state.some) {
            classesAction.push('ap-dom-unit-panel_action--some')
          }
          return (
            <button 
              key={action} 
              className={classesAction.join(' ')}
              onClick={() => handleActionClick(action)}
            >
              {action}
            </button>
          )
        }
      )}
    </Panel>
  )
  // #endregion
}
