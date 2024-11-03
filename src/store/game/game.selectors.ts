import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../state'

export const base = (state: RootState) => state.game

export const turn = (state: RootState) => base(state).turn
export const currentPlayer = (state: RootState) => base(state).currentPlayer

export const map = (state: RootState) => base(state).map
export const selectedTile = (state: RootState) => base(state).selectedTile
export const selectedUnits = (state: RootState) => base(state).selectedUnits

export const buildings = (state: RootState) => base(state).buildings
export const building = (id: string) => (state: RootState) => buildings(state)[id]

export const players = (state: RootState) => base(state).players
export const player = (id: string) => (state: RootState) => players(state)[id]
// export const playerCurrent = (id: string) => (state: RootState) => players(state)[currentPlayer(state)]
export const playerCurrent = createSelector([currentPlayer, players], (currentPlayer, players) =>
  players[currentPlayer]
)

export const tiles = (state: RootState) => base(state).tiles
export const tile = (id: string) => (state: RootState) => tiles(state)[id]

export const units = (state: RootState) => base(state).units
export const unit = (id: string) => (state: RootState) => units(state)[id]
export const unitsSelected = createSelector([selectedUnits, units], (selectedUnits, units) =>
  selectedUnits.map(unit => units[unit])
)
export const unitsCurrent = createSelector([currentPlayer, units], (currentPlayer, units) =>
  Object.values(units).filter(unit => unit.owner === currentPlayer)
)

const GameSelectors = {
  turn,
  currentPlayer,

  map,
  selectedTile,
  selectedUnits,
  
  building,
  
  player,
  playerCurrent,
  
  tile,

  unit,
  unitsSelected,
  unitsCurrent,
}

export default GameSelectors
