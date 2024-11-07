import { DataState } from "@uncover/js-utils"

export interface GamesState {
  games: Record<string, GameInfo>
  
  getGamesState: DataState
  getGamesError: string | null

  postGameState: DataState
  postGameError: string | null

  deleteGameState: DataState
  deleteGameError: string | null
}

type GameInfoState =
  | 'PENDING'
  | 'STARTED'
  | 'FINISHED'
export const GameInfoStates: {
  PENDING: GameInfoState
  STARTED: GameInfoState
  FINISHED: GameInfoState
} = {
  PENDING: 'PENDING',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
}
export interface GameInfo {
  id: string
  name: string
  password: string

  state: GameInfoState
  setup: GameInfoSetup
  players: Record<string, GameInfoPlayer>
}

export interface GameInfoSetup {
  map: {
    width: number
    height: number
  }
}

export interface GameInfoPlayer {
  name: string
  nation: string
}