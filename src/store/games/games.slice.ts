import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { GameInfo, GamesState } from './games.state'
import { DataStates } from '@uncover/js-utils'

// STATE //

const initialState: GamesState = {
  games: {},
  getGamesState: DataStates.NEVER,
  getGamesError: null,

  postGameState: DataStates.NEVER,
  postGameError: null,

  deleteGameState: DataStates.NEVER,
  deleteGameError: null
}

// REDUCERS //

// #region Get Games

/*
 * Game listing reducers 
 */

// #region > Request
const getGamesRequest: CaseReducer<GamesState, PayloadAction<void>> = (state) => {
  state.getGamesState = state.getGamesState === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
  state.getGamesError = null
}
// #endregion

// #region > Success
interface PayloadGetGamesSuccess {
  games: GameInfo[]
}
const getGamesSuccess: CaseReducer<GamesState, PayloadAction<PayloadGetGamesSuccess>> = (state, action) => {
  const { games } = action.payload
  state.getGamesState = DataStates.SUCCESS
  state.getGamesError = null
  state.games = {}
  games.forEach((game) => state.games[game.id] = game)
}
// #endregion

// #region > Failure
interface PayloadGetGamesFailure {
  error: string
}
const getGamesFailure: CaseReducer<GamesState, PayloadAction<PayloadGetGamesFailure>> = (state, action) => {
  state.getGamesState = DataStates.FAILURE
  state.getGamesError = action.payload.error
}
// #endregion

// #region Post Game

/*
 * Game Creation reducers 
 */

// #region > Request
const postGameRequest: CaseReducer<GamesState, PayloadAction<void>> = (state) => {
  state.postGameState = DataStates.FETCHING
  state.postGameError = null
}
// #endregion

// #region > Success
interface PayloadPostGameSuccess {
  game: GameInfo
}
const postGameSuccess: CaseReducer<GamesState, PayloadAction<PayloadPostGameSuccess>> = (state, action) => {
  const { game } = action.payload
  state.postGameState = DataStates.SUCCESS
  state.postGameError = null
  state.games[game.id] = game
}
// #endregion

// #region > Failure
interface PayloadPostGameFailure {
  error: string
}
const postGameFailure: CaseReducer<GamesState, PayloadAction<PayloadPostGameFailure>> = (state, action) => {
  state.postGameState = DataStates.FAILURE
  state.postGameError = action.payload.error
}
// #endregion


// #region Delete Game

/*
 * Game Creation reducers 
 */

// #region > Request
interface PayloadDeleteGameRequest {
  gameId: string
}
const deleteGameRequest: CaseReducer<GamesState, PayloadAction<PayloadDeleteGameRequest>> = (state) => {
  state.deleteGameState = DataStates.FETCHING
  state.deleteGameError = null
}
// #endregion

// #region > Success
interface PayloadDeleteGameSuccess {
  gameId: string
}
const deleteGameSuccess: CaseReducer<GamesState, PayloadAction<PayloadDeleteGameSuccess>> = (state, action) => {
  const { gameId } = action.payload
  state.deleteGameState = DataStates.SUCCESS
  state.deleteGameError = null
  delete state.games[gameId]
}
// #endregion

// #region > Failure
interface PayloadDeleteGameFailure {
  error: string
}
const deleteGameFailure: CaseReducer<GamesState, PayloadAction<PayloadDeleteGameFailure>> = (state, action) => {
  state.deleteGameState = DataStates.FAILURE
  state.deleteGameError = action.payload.error
}
// #endregion

// SLICE //

const GamesSlice = createSlice({
  name: 'games',
  initialState,

  reducers: {
    getGamesRequest,
    getGamesSuccess,
    getGamesFailure,

    postGameRequest,
    postGameSuccess,
    postGameFailure,

    deleteGameRequest,
    deleteGameSuccess,
    deleteGameFailure
  },
})

export default GamesSlice
