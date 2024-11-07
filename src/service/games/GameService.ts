import { GameInfo } from '../../store/games/games.state'
import GamesSlice from '../../store/games/games.slice'

export interface GameService {
  getGames: () => Promise<GameInfo[]>
  postGame: (game: GameInfo) => Promise<GameInfo>
  deleteGame: (gameId: string) => Promise<void>
}

export const loadGames = async (service: GameService, dispatch: any) => {
  dispatch(GamesSlice.actions.getGamesRequest())
  return service.getGames()
    .then((games) => dispatch(GamesSlice.actions.getGamesSuccess({ games })))
    .catch((error) => dispatch(GamesSlice.actions.getGamesFailure({ error })))
}

export const createGame = async (service: GameService, dispatch: any, game: GameInfo) => {
  dispatch(GamesSlice.actions.postGameRequest())
  return service.postGame(game)
    .then((game) => dispatch(GamesSlice.actions.postGameSuccess({ game })))
    .catch((error) => dispatch(GamesSlice.actions.postGameFailure({ error })))
}

export const deleteGame = async (service: GameService, dispatch: any, gameId: string) => {
  dispatch(GamesSlice.actions.deleteGameRequest())
  return service.deleteGame(gameId)
    .then(() => dispatch(GamesSlice.actions.deleteGameSuccess({ gameId })))
    .catch((error) => dispatch(GamesSlice.actions.deleteGameFailure({ error })))
}