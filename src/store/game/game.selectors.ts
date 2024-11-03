import { RootState } from '../state'

export const base = (state: RootState) => state.game

export const turn = (state: RootState) => base(state).turn

export const map = (state: RootState) => base(state).map
export const selectedTile = (state: RootState) => base(state).selectedTile
export const selectedUnits = (state: RootState) => base(state).selectedUnits

export const buildings = (state: RootState) => base(state).buildings
export const building = (id: string) => (state: RootState) => buildings(state)[id]

export const players = (state: RootState) => base(state).players
export const player = (id: string) => (state: RootState) => players(state)[id]

export const tiles = (state: RootState) => base(state).tiles
export const tile = (id: string) => (state: RootState) => tiles(state)[id]

export const units = (state: RootState) => base(state).units
export const unit = (id: string) => (state: RootState) => units(state)[id]

const GameSelectors = {
  turn,
  
  map,
  selectedTile,
  selectedUnits,
  
  building,
  player,
  tile,
  unit,
}

export default GameSelectors
