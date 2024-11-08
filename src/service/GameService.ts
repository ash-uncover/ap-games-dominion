import { GameData } from '../lib/model/game/GameData'
import { GameInfo } from '../lib/model/game/GameInfo'
import GamesSlice from '../store/games/games.slice'
import GameSlice from '../store/game/game.slice'

export interface GameService {
  getGames: () => Promise<GameInfo[]>
  postGame: (game: GameInfo) => Promise<void>
  deleteGame: (gameId: string) => Promise<void>

  getGameTurn: (gameId: string, playerId: string) => Promise<GameData>
  putGameTurn: (gameId: string, playerId: string, gameTurn: GameData) => Promise<void>
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
    .then(() => dispatch(GamesSlice.actions.postGameSuccess()))
    .catch((error) => dispatch(GamesSlice.actions.postGameFailure({ error })))
}

export const deleteGame = async (service: GameService, dispatch: any, gameId: string) => {
  dispatch(GamesSlice.actions.deleteGameRequest())
  return service.deleteGame(gameId)
    .then(() => dispatch(GamesSlice.actions.deleteGameSuccess({ gameId })))
    .catch((error) => dispatch(GamesSlice.actions.deleteGameFailure({ error })))
}

export const getGameTurn = async (service: GameService, dispatch: any, gameId: string, playerId: string) => {
  dispatch(GameSlice.actions.getGameTurnRequest())
  return service.getGameTurn(gameId, playerId)
    .then((gameData: GameData) => dispatch(GameSlice.actions.getGameTurnSuccess({ gameId, playerId, gameData })))
    .catch((error) => dispatch(GameSlice.actions.getGameTurnFailure({ error })))
}

export const putGameTurn = async (service: GameService, dispatch: any, gameId: string, playerId: string, gameData: GameData) => {
  dispatch(GameSlice.actions.putGameTurnRequest())
  return service.putGameTurn(gameId, playerId, gameData)
    .then((game) => dispatch(GameSlice.actions.putGameTurnSuccess({ gameId, playerId })))
    .catch((error) => dispatch(GameSlice.actions.putGameTurnFailure({ error })))
}
