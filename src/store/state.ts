import { AppState } from './app/app.state'
import { GameState } from './game/game.state'
import { DataState } from './data/data.state'

export type RootState = {
  app: AppState,
  data: DataState,
  game: GameState,
}