import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { GameState } from './game.state'
import { UnitOrder, UnitOrders } from '../../lib/model/game/UnitOrder'

// STATE //

const initialState: GameState = {
  turn: 1,
  currentPlayer: 'player-0',
  map: {
    width: -1,
    height: -1,
    tiles: []
  },
  selectedTile: '',
  selectedUnits: [],
  buildings: {},
  players: {},
  tiles: {},
  units: {},
}

// REDUCERS //

// #region Start
interface PayloadStart {
  map: {
    width: number
    height: number
  },
  players: {
    name: string
    nation: string
  }[]
}
const start: CaseReducer<GameState, PayloadAction<PayloadStart>> = (state, action) => {
  const {
    map,
    players,
  } = action.payload
  // Setup Map
  state.map = {
    width: map.width,
    height: map.height,
    tiles: []
  }
  state.tiles = {}
  for (let x = 0 ; x < map.width ; x++) {
    const row = []
    for (let y = 0 ; y < map.height ; y++) {
      const tileId = `tile-${x}-${y}`
      const tile = {
        id: `tile-${x}-${y}`,
        x,
        y,
        buildings: [],
        units: [],
      }
      row.push(tileId)
      state.tiles[tileId] = tile
    }
    state.map.tiles.push(row)
  }
  // Setup Players
  state.players = {}
  state.buildings = {}
  players.forEach((player, index) => {
    const playerId = `player-${index}`
    state.players[playerId] = {
      id: playerId,
      name: player.name,
      nation: player.nation,
      buildings: [],
      units: [],
    }
    const randomWidth =  Math.floor(Math.random() * map.width)
    const randomHeight =  Math.floor(Math.random() * map.height)
    const randomTile = state.map.tiles[randomHeight][randomWidth]
    const buildingId = `building-${index}`
    const tileId = state.map.tiles[randomHeight][randomWidth]
    state.buildings[buildingId] = {      
      id: buildingId,
      name: buildingId,
      owner: playerId,
      tile: randomTile
    }
    state.players[playerId].buildings.push(buildingId)
    state.tiles[tileId].buildings.push(buildingId)
    const unitId1 = `unit-${index}-1`
    state.units[unitId1] = {      
      id: unitId1,
      name: unitId1,
      owner: playerId,
      tile: randomTile,
      order: { key: UnitOrders.NONE }
    }
    state.players[playerId].units.push(unitId1)
    state.tiles[tileId].units.push(unitId1)
    const unitId2 = `unit-${index}-2`
    state.units[unitId2] = {      
      id: unitId2,
      name: unitId2,
      owner: playerId,
      tile: randomTile,
      order: { key: UnitOrders.NONE }
    }
    state.players[playerId].units.push(unitId2)
    state.tiles[tileId].units.push(unitId2)
  })
}
// #endregion

// #region Select Tile
interface PayloadSelectTile {
  id: string
}
const selectTile: CaseReducer<GameState, PayloadAction<PayloadSelectTile>> = (state, action) => {
  const {
    id
  } = action.payload
  if (state.selectedTile !== id) {
    state.selectedUnits.forEach(unitId => {
      state.units[unitId].selected = false
    })
    state.selectedUnits = []

    if (state.tiles[state.selectedTile]) {
      state.tiles[state.selectedTile].selected = false
    }
    if (state.tiles[id]) {
      state.tiles[id].selected = true
      state.selectedTile = id
    }
  }
}
// #endregion

// #region Select Unit
interface PayloadSelectUnit {
  id: string
}
const selectUnit: CaseReducer<GameState, PayloadAction<PayloadSelectUnit>> = (state, action) => {
  const {
    id
  } = action.payload
  state.selectedUnits.forEach(unitId => {
    state.units[unitId].selected = false
  })
  state.units[id].selected = true
  state.selectedUnits = [id]
}
// #endregion

// #region Set Unit Order
interface PayloadSetUnitOrder {
  id: string
  key: UnitOrder
  data?: any
}
const setUnitOrder: CaseReducer<GameState, PayloadAction<PayloadSetUnitOrder>> = (state, action) => {
  const {
    id,
    key,
    data
  } = action.payload
  const unit = state.units[id]
  const tile = state.tiles[unit.tile]
  if (key === UnitOrders.MOVE && data.x === tile.x && data.y === tile.y) {
    unit.order = { key: 'NONE' }
  } else {
    state.units[id].order = {
      key,
      data
    }
  }
}
// #endregion

// #region End Turn
const endTurn: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {

}
// #endregion

// SLICE //

const GameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    start,

    selectTile,
    selectUnit,
    setUnitOrder,

    endTurn,
  },
})

export default GameSlice
