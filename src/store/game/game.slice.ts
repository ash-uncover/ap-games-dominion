import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { DataStates } from '@sol.ac/js-utils'

//import { GameData, GameDataBuilding, GameDataPlayer, GameDataUnit } from '../../lib/model/game/GameData'
import { UnitOrder } from '../../lib/model/constants/UnitOrder'

import { GameBuilding, GamePlayer, GameState, GameUnit } from './game.state'
import { PayloadGameTurnDataGet, PayloadGameTurnDataGetBuilding, PayloadGameTurnDataGetPlayer, PayloadGameTurnDataGetUnit } from 'src/lib/model/payload/PayloadGameTurnDataGet'

// STATE //

const initialState: GameState = {
  id: '',
  name: '',
  turn: -1,
  player: '',
  map: {
    tiles: []
  },
  selectedTile: '',
  selectedUnits: [],
  buildings: {},
  players: {},
  tiles: {},
  units: {},

  getGameTurnState: DataStates.NEVER,
  getGameTurnError: null,

  putGameTurnState: DataStates.NEVER,
  putGameTurnError: null,
}

// REDUCERS //

// #region Get Game Turn

/*
 * Game turn retrieval reducers 
 */

// #region > Request
interface PayloadGetGameTurnRequest {
  gameId: string
  playerId: string
}
const getGameTurnRequest: CaseReducer<GameState, PayloadAction<PayloadGetGameTurnRequest>> = (state, action) => {
  state.getGameTurnState = DataStates.FETCHING
  state.getGameTurnError = null
}
// #endregion

// #region > Success
interface PayloadGetGameTurnSuccess {
  gameId: string
  playerId: string
  turnData: PayloadGameTurnDataGet
}
const getGameTurnSuccess: CaseReducer<GameState, PayloadAction<PayloadGetGameTurnSuccess>> = (state, action) => {
  const {
    gameId,
    playerId,
    turnData
  } = action.payload
  // Request Info
  state.getGameTurnState = DataStates.SUCCESS
  state.getGameTurnError = null
  // Interaction Info
  state.selectedTile = null
  state.selectedUnits = []
  // Basic Info
  state.id = gameId
  state.turn = turnData.turn
  state.player = playerId
  // Map Info
  state.tiles = {}
  state.map = {
    tiles: turnData.map.tiles.map(
      tiles => tiles.map(
        tile => {
          state.tiles[tile.id] = {
            ...tile,
            buildings: [],
            units: []
          }
          return tile.id
        }
      )
    )
  }
  // Players Info
  state.players = turnData.players.reduce((acc: Record<string, GamePlayer>, playerData: PayloadGameTurnDataGetPlayer) => {
    const player = {
      id: playerData.id,
      name: playerData.name,
      nation: playerData.nation,
      buildings: [],
      units: []
    }
    acc[playerData.id] = player
    return acc
  }, {})
  // Buildings Info
  state.buildings = turnData.buildings.reduce((acc: Record<string, GameBuilding>, buildingData: PayloadGameTurnDataGetBuilding) => {
    state.tiles[buildingData.tileId].buildings.push(buildingData.id)
    state.players[buildingData.playerId].buildings.push(buildingData.id)
    const building: GameBuilding = {
      id: buildingData.id,
      player: buildingData.playerId,
      tile: buildingData.tileId,
      name: buildingData.name,
    }
    acc[buildingData.id] = building
    return acc
  }, {})
  // Units Info
  state.units = turnData.units.reduce((acc: Record<string, GameUnit>, unitData: PayloadGameTurnDataGetUnit) => {
    state.tiles[unitData.tileId].units.push(unitData.id)
    state.players[unitData.playerId].units.push(unitData.id)
    const unit = {
      id: unitData.id,
      player: unitData.playerId,
      tile: unitData.tileId,
      name: unitData.name,
      order: unitData.order,
    }
    acc[unitData.id] = unit
    return acc
  }, {})
}
// #endregion

// #region > Failure
interface PayloadGetGameTurnFailure {
  error: string
}
const getGameTurnFailure: CaseReducer<GameState, PayloadAction<PayloadGetGameTurnFailure>> = (state, action) => {
  const {
    error,
  } = action.payload
  state.getGameTurnState = DataStates.FAILURE
  state.getGameTurnError = error
}
// #endregion

// #region > Outdate
const getGameTurnOutdate: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.getGameTurnState = DataStates.OUTDATED
}
// #endregion

// #endregion

// #region Put Game Turn

/*
 * Game turn update reducers 
 */

// #region > Request
interface PayloadPutGameTurnRequest {
  gameId: string
  playerId: string
}
const putGameTurnRequest: CaseReducer<GameState, PayloadAction<PayloadPutGameTurnRequest>> = (state, action) => {
  state.putGameTurnState = DataStates.FETCHING
  state.putGameTurnError = null
}
// #endregion

// #region > Success
interface PayloadPutGameTurnSuccess {
  gameId: string
  playerId: string
}
const putGameTurnSuccess: CaseReducer<GameState, PayloadAction<PayloadPutGameTurnSuccess>> = (state, action) => {
  const {
    gameId,
    playerId
  } = action.payload
  state.putGameTurnState = DataStates.SUCCESS
  state.putGameTurnError = null
}
// #endregion

// #region > Failure
interface PayloadPutGameTurnFailure {
  error: string
}
const putGameTurnFailure: CaseReducer<GameState, PayloadAction<PayloadPutGameTurnFailure>> = (state, action) => {
  const {
    error,
  } = action.payload
  state.putGameTurnState = DataStates.FAILURE
  state.putGameTurnError = error
}
// #endregion


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
  if (key === UnitOrder.MOVE && data.x === tile.x && data.y === tile.y) {
    unit.order = { key: UnitOrder.NONE }
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
    getGameTurnRequest,
    getGameTurnSuccess,
    getGameTurnFailure,
    getGameTurnOutdate,
    
    putGameTurnRequest,
    putGameTurnSuccess,
    putGameTurnFailure,

    selectTile,
    selectUnit,
    setUnitOrder,

    endTurn,
  },
})

export default GameSlice
