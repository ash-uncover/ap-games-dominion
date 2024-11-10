import { PayloadGameInfoGet } from '../lib/model/payload/PayloadGameInfoGet'
import { PayloadGameInfoPut } from '../lib/model/payload/PayloadGameInfoPut'
import { PayloadGameTurnDataGet } from '../lib/model/payload/PayloadGameTurnDataGet'
import { PayloadGameTurnOrdersPut } from '../lib/model/payload/PayloadGameTurnOrdersPut'

export interface GameService {
  getGames: () => Promise<PayloadGameInfoGet[]>
  getGame: (gameId: string) => Promise<PayloadGameInfoGet>
  postGame: (game: PayloadGameInfoPut) => Promise<void>
  deleteGame: (gameId: string) => Promise<void>

  getGameTurn: (gameId: string, playerId: string) => Promise<PayloadGameTurnDataGet>
  putGameTurn: (gameId: string, playerId: string, gameTurn: PayloadGameTurnOrdersPut) => Promise<PayloadGameInfoGet>
  postGameTurn: (gameId: string) => Promise<PayloadGameInfoGet>
}