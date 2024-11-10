import { PayloadGameInfoGet } from '../lib/model/payload/PayloadGameInfoGet'
import { PayloadGameInfoPut } from '../lib/model/payload/PayloadGameInfoPut'
import { PayloadGameTurnDataGet } from '../lib/model/payload/PayloadGameTurnDataGet'
import { PayloadGameTurnOrdersPut } from 'src/lib/model/payload/PayloadGameTurnOrdersPut'
import { GameService } from './GameService'
import GamesSlice from '../store/games/games.slice'
import GameSlice from '../store/game/game.slice'

export const getGames = async (service: GameService, dispatch: any) => {
  dispatch(GamesSlice.actions.getGamesRequest())
  return service.getGames()
    .then((games: PayloadGameInfoGet[]) => dispatch(GamesSlice.actions.getGamesSuccess({ games })))
    .catch((error) => dispatch(GamesSlice.actions.getGamesFailure({ error })))
}

export const getGame = async (service: GameService, dispatch: any, gameId: string) => {
  dispatch(GamesSlice.actions.getGameRequest())
  return service.getGame(gameId)
    .then((game: PayloadGameInfoGet) => dispatch(GamesSlice.actions.getGameSuccess({ game })))
    .catch((error) => dispatch(GamesSlice.actions.getGameFailure({ error })))
}

export const postGame = async (service: GameService, dispatch: any, game: PayloadGameInfoPut) => {
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
    .then((gameData: PayloadGameTurnDataGet) => dispatch(GameSlice.actions.getGameTurnSuccess({ gameId, playerId, turnData: gameData })))
    .catch((error) => dispatch(GameSlice.actions.getGameTurnFailure({ error })))
}

export const putGameTurn = async (service: GameService, dispatch: any, gameId: string, playerId: string, orders: PayloadGameTurnOrdersPut) => {
  dispatch(GameSlice.actions.putGameTurnRequest())
  return service.putGameTurn(gameId, playerId, orders)
    .then((game) => {
      dispatch(GamesSlice.actions.getGameSuccess({ game }))
      dispatch(GameSlice.actions.putGameTurnSuccess({ gameId, playerId }))
    })
    .catch((error) => dispatch(GameSlice.actions.putGameTurnFailure({ error })))
}

export const postGameTurn = async (service: GameService, dispatch: any, gameId: string) => {
  dispatch(GamesSlice.actions.postTurnRequest())
  return service.postGameTurn(gameId)
    .then((game) => dispatch(GamesSlice.actions.postTurnSuccess({ game })))
    .catch((error) => dispatch(GamesSlice.actions.postTurnFailure({ error })))
}
