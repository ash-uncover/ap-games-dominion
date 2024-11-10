import { createSelector } from '@reduxjs/toolkit'
import { DataState } from '@uncover/js-utils'
import { RootState } from '../state'
import { PayloadGameInfoGet, PayloadGameInfoGetPlayer } from '../../lib/model/payload/PayloadGameInfoGet'

export const base = (state: RootState) => state.games

export const games = (state: RootState): Record<string, PayloadGameInfoGet> => base(state).games
export const gameIds = createSelector([games], (games) => Object.keys(games))
export const game = (gameId: string) => (state: RootState): PayloadGameInfoGet => games(state)[gameId]

export const players = (gameId: string) => (state: RootState): PayloadGameInfoGetPlayer[] => game(gameId)(state).players
export const player = (gameId: string, playerId: string) => (state: RootState): PayloadGameInfoGetPlayer => players(gameId)(state).find(p => p.id === playerId)

export const getGamesState = (state: RootState): DataState => base(state).getGamesState
export const getGamesError = (state: RootState): string | null => base(state).getGamesError

export const postGameState = (state: RootState): DataState => base(state).postGameState
export const postGameError = (state: RootState): string | null => base(state).postGameError

export const deleteGameState = (state: RootState): DataState => base(state).deleteGameState
export const deleteGameError = (state: RootState): string | null => base(state).deleteGameError

export const postTurnState = (state: RootState): DataState => base(state).postTurnState
export const postTurnError = (state: RootState): string | null => base(state).postTurnError

const GamesSelectors = {
  gameIds,
  games,
  game,

  players,
  player,
  
  getGamesState,
  getGamesError,

  postGameState,
  postGameError,

  deleteGameState,
  deleteGameError,

  postTurnState,
  postTurnError,
}

export default GamesSelectors
