import { AppState } from './app/app.state'
import { DataState } from './data/data.state'
import { GameState } from './game/game.state'
import { GamesState } from './games/games.state'

export type RootState = {
  app: AppState,
  data: DataState,
  game: GameState,
  games: GamesState,
}