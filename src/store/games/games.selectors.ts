import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../state'
import { GameInfo } from './games.state'
import { DataState } from '@uncover/js-utils'

export const base = (state: RootState) => state.games

export const games = (state: RootState): Record<string, GameInfo> => base(state).games
export const gameIds = createSelector([games], (games) =>
  Object.keys(games)
)
export const game = (id: string) => (state: RootState): GameInfo => games(state)[id]

export const getGamesState = (state: RootState): DataState => base(state).getGamesState
export const getGamesError = (state: RootState): string | null => base(state).getGamesError

export const postGameState = (state: RootState): DataState => base(state).postGameState
export const postGameError = (state: RootState): string | null => base(state).postGameError

export const deleteGameState = (state: RootState): DataState => base(state).deleteGameState
export const deleteGameError = (state: RootState): string | null => base(state).deleteGameError

const GamesSelectors = {
  gameIds,
  games,
  game,
  
  getGamesState,
  getGamesError,

  postGameState,
  postGameError,

  deleteGameState,
  deleteGameError,
}

export default GamesSelectors
