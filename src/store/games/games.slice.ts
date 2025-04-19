import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { GamesState } from './games.state'
import { DataStates } from '@sol.ac/js-utils'
import { PayloadGameInfoGet } from '../../lib/model/payload/PayloadGameInfoGet'

// STATE //

const initialState: GamesState = {
  games: {},
  
  getGamesState: DataStates.NEVER,
  getGamesError: null,

  postGameState: DataStates.NEVER,
  postGameError: null,

  deleteGameState: DataStates.NEVER,
  deleteGameError: null,

  postTurnState: DataStates.NEVER,
  postTurnError: null,
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
  games: PayloadGameInfoGet[]
}
const getGamesSuccess: CaseReducer<GamesState, PayloadAction<PayloadGetGamesSuccess>> = (state, action) => {
  const { games } = action.payload
  state.games = games.reduce((acc, game) => {
    acc[game.id] = game
    return acc
  }, {})
  state.getGamesState = DataStates.SUCCESS
  state.getGamesError = null
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

// #endregion

// #region Get Game

/*
 * Game getter reducers 
 */

// #region > Request
const getGameRequest: CaseReducer<GamesState, PayloadAction<void>> = (state) => {
  state.getGamesState = state.getGamesState === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
  state.getGamesError = null
}
// #endregion

// #region > Success
interface PayloadGetGameSuccess {
  game: PayloadGameInfoGet
}
const getGameSuccess: CaseReducer<GamesState, PayloadAction<PayloadGetGameSuccess>> = (state, action) => {
  const { game } = action.payload
  state.games[game.id] = game
  state.getGamesState = DataStates.SUCCESS
  state.getGamesError = null
}
// #endregion

// #region > Failure
interface PayloadGetGameFailure {
  error: string
}
const getGameFailure: CaseReducer<GamesState, PayloadAction<PayloadGetGameFailure>> = (state, action) => {
  state.getGamesState = DataStates.FAILURE
  state.getGamesError = action.payload.error
}
// #endregion

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
const postGameSuccess: CaseReducer<GamesState, PayloadAction<void>> = (state, action) => {
  state.postGameState = DataStates.SUCCESS
  state.postGameError = null
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

// #endregion

// #region Post Turn

/*
 * Game Turn Host
 */

// #region > Request
interface PayloadPostTurnRequest {
  gameId: string
}
const postTurnRequest: CaseReducer<GamesState, PayloadAction<PayloadPostTurnRequest>> = (state) => {
  state.postTurnState = DataStates.FETCHING
  state.postTurnError = null
}
// #endregion

// #region > Success
interface PayloadPostTurnSuccess {
  game: PayloadGameInfoGet
}
const postTurnSuccess: CaseReducer<GamesState, PayloadAction<PayloadPostTurnSuccess>> = (state, action) => {
  const { game } = action.payload
  state.postTurnState = DataStates.SUCCESS
  state.postTurnError = null
  state.games[game.id] = game
}
// #endregion

// #region > Failure
interface PayloadPostTurnFailure {
  error: string
}
const postTurnFailure: CaseReducer<GamesState, PayloadAction<PayloadPostTurnFailure>> = (state, action) => {
  state.postTurnState = DataStates.FAILURE
  state.postTurnError = action.payload.error
}
// #endregion

// #endregion

// SLICE //

const GamesSlice = createSlice({
  name: 'games',
  initialState,

  reducers: {
    getGamesRequest,
    getGamesSuccess,
    getGamesFailure,

    getGameRequest,
    getGameSuccess,
    getGameFailure,

    postGameRequest,
    postGameSuccess,
    postGameFailure,

    deleteGameRequest,
    deleteGameSuccess,
    deleteGameFailure,

    postTurnRequest,
    postTurnSuccess,
    postTurnFailure,
  },
})

export default GamesSlice
