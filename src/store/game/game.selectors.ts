import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../state'

export const base = (state: RootState) => state.game

export const gameId = (state: RootState) => base(state).id
export const name = (state: RootState) => base(state).name
export const turn = (state: RootState) => base(state).turn
export const playerId = (state: RootState) => base(state).player

export const map = (state: RootState) => base(state).map
export const selectedTile = (state: RootState) => base(state).selectedTile
export const selectedUnits = (state: RootState) => base(state).selectedUnits

export const buildings = (state: RootState) => base(state).buildings
export const building = (id: string) => (state: RootState) => buildings(state)[id]

export const players = (state: RootState) => base(state).players
export const player = (id: string) => (state: RootState) => players(state)[id]
export const playerCurrent = createSelector([playerId, players], (currentPlayer, players) =>
  players[currentPlayer]
)

export const tiles = (state: RootState) => base(state).tiles
export const tile = (id: string) => (state: RootState) => tiles(state)[id]

export const units = (state: RootState) => base(state).units
export const unit = (id: string) => (state: RootState) => units(state)[id]
export const unitsSelected = createSelector([selectedUnits, units], (selectedUnits, units) =>
  selectedUnits.map(unit => units[unit])
)
export const unitsCurrent = createSelector([playerId, units], (currentPlayer, units) =>
  Object.values(units).filter(unit => unit.player === currentPlayer)
)

export const getGameTurnState = (state: RootState) => base(state).getGameTurnState
export const getGameTurnError = (state: RootState) => base(state).getGameTurnError

const GameSelectors = {
  base,

  turn,
  gameId,
  name,
  playerId,

  map,
  selectedTile,
  selectedUnits,
  
  building,
  
  players,
  player,
  playerCurrent,
  
  tile,

  unit,
  unitsSelected,
  unitsCurrent,

  getGameTurnState,
  getGameTurnError,
}

export default GameSelectors
