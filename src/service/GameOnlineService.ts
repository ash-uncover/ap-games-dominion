import { GameData } from '../lib/model/game/GameData'
import { GameInfo } from '../lib/model/game/GameInfo'
import { GameService } from './GameService'

// #region getGames
export const getGames = () => {
  return new Promise<GameInfo[]>((resolve) => {
    setTimeout(() => {
      resolve([])
    }, 0)
  })
}
// #endregion

// #region postGame
export const postGame = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}
// #endregion

// #region deleteGame
export const deleteGame = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}
// #endregion

// #region getGameTurn
export const getGameTurn = (gameId: string, playerId: string): Promise<GameData> => {
  return new Promise<GameData>((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 0)
  })
}
// #endregion

// #region putGameTurn
export const putGameTurn = (gameId: string, playerId: string, turn: GameData): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}
// #endregion

export const GameOnlineService: GameService = {
  getGames,
  postGame,
  deleteGame,
  
  getGameTurn,
  putGameTurn
}
