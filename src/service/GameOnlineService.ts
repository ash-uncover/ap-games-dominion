import { GameService } from './GameService'
import { PayloadGameInfoGet } from '../lib/model/payload/PayloadGameInfoGet'
import { PayloadGameInfoPut } from '../lib/model/payload/PayloadGameInfoPut'
import { PayloadGameTurnDataGet } from '../lib/model/payload/PayloadGameTurnDataGet'
import { PayloadGameTurnOrdersPut } from '../lib/model/payload/PayloadGameTurnOrdersPut'

// #region getGames
export const getGames = async (): Promise<PayloadGameInfoGet[]> => {
  return new Promise<PayloadGameInfoGet[]>((resolve) => {
    setTimeout(() => {
      resolve([])
    }, 0)
  })
}
// #endregion

// #region getGame
export const getGame = async (gameId: string): Promise<PayloadGameInfoGet> => {
  return new Promise<PayloadGameInfoGet>((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 0)
  })
}
// #endregion

// #region postGame
export const postGame = async (gameInfo: PayloadGameInfoPut): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}
// #endregion

// #region deleteGame
export const deleteGame = async (gameId: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}
// #endregion

// #region getGameTurn
export const getGameTurn = async (gameId: string, playerId: string): Promise<PayloadGameTurnDataGet> => {
  return new Promise<PayloadGameTurnDataGet>((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 0)
  })
}
// #endregion

// #region putGameTurn
export const putGameTurn = async (gameId: string, playerId: string, turn: PayloadGameTurnOrdersPut): Promise<PayloadGameInfoGet> => {
  return new Promise<PayloadGameInfoGet>((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 0)
  })
}
// #endregion

// #region postGameTurn
export const postGameTurn = async (gameId: string): Promise<PayloadGameInfoGet> => {
  return new Promise<PayloadGameInfoGet>((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 0)
  })
}
// #endregion

export const GameOnlineService: GameService = {
  getGames,
  getGame,
  postGame,
  deleteGame,
  
  getGameTurn,
  putGameTurn,
  postGameTurn,
}
