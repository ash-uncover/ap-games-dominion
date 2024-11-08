import { DataState } from '@uncover/js-utils'
import { GameInfo } from '../../lib/model/game/GameInfo'

export interface GamesState {
  games: Record<string, GameInfo>
  
  getGamesState: DataState
  getGamesError: string | null

  postGameState: DataState
  postGameError: string | null

  deleteGameState: DataState
  deleteGameError: string | null
}
