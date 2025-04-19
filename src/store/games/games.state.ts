import { DataState } from '@sol.ac/js-utils'
import { PayloadGameInfoGet } from '../../lib/model/payload/PayloadGameInfoGet'

export interface GamesState {
  games: Record<string, PayloadGameInfoGet>
  
  getGamesState: DataState
  getGamesError: string | null

  postGameState: DataState
  postGameError: string | null

  deleteGameState: DataState
  deleteGameError: string | null

  postTurnState: DataState
  postTurnError: string | null
}
