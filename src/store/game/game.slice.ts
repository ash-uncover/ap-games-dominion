import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { GameState } from './game.state'

// STATE //

const initialState: GameState = {
  turn: 1,
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
    const unitId = `unit-${index}`
    state.units[unitId] = {      
      id: unitId,
      name: unitId,
      owner: playerId,
      tile: randomTile
    }
    state.players[playerId].units.push(unitId)
    state.tiles[tileId].units.push(unitId)
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

// SLICE //

const GameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    start,

    selectTile,
    selectUnit,
  },
})

export default GameSlice
