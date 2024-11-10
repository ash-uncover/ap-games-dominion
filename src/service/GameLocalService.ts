import { GameService } from './GameService'
import { GameStatus } from '../lib/model/constants/GameStatus'

import { PlayerTurnState } from '../lib/model/constants/PlayerTurnState'
import { UnitOrder } from '../lib/model/constants/UnitOrder'

import { DatabaseGameData, DatabaseGameDataStarted, DatabaseGameDataStartedPlayer } from '../lib/model/database/DatabaseGameData'
import { convertDBDataToPayloadInfo } from '../lib/model/database/convertDBDataToPayloadInfo'
import { convertPayloadInfoToDBData } from '../lib/model/database/convertPayloadInfoToDBData'
import { convertDBDataToPayloadTurn } from '../lib/model/database/convertDBDataToPayloadTurn'

import { PayloadGameInfoGet } from '../lib/model/payload/PayloadGameInfoGet'
import { PayloadGameInfoPut } from '../lib/model/payload/PayloadGameInfoPut'
import { PayloadGameTurnDataGet } from '../lib/model/payload/PayloadGameTurnDataGet'
import { PayloadGameTurnOrdersPut } from '../lib/model/payload/PayloadGameTurnOrdersPut'

function getGamesData(): DatabaseGameData[] {
  try {
    return JSON.parse(localStorage.getItem('AP_DOM_LOCAL_GAMES') || '[]')
  } catch {
    return []
  }
}
function setGamesData(games: DatabaseGameData[]) {
  localStorage.setItem('AP_DOM_LOCAL_GAMES', JSON.stringify(games || []))
}

// #region getGames
export const getGames = async (): Promise<PayloadGameInfoGet[]> => {
  return new Promise<PayloadGameInfoGet[]>((resolve) => {
    setTimeout(() => {
      try {
        const gamesData = getGamesData()
        const games = gamesData.map(game => {
          return convertDBDataToPayloadInfo(game)
        })
        resolve(games)
      } catch {
        resolve([])
      }
    }, 0)
  })
}
// #endregion

// #region getGame
export const getGame = async (gameId: string): Promise<PayloadGameInfoGet> => {
  return new Promise<PayloadGameInfoGet>((resolve) => {
    setTimeout(() => {
      try {
        const gamesData = getGamesData()
        const game = gamesData.find(game => game.id === gameId)
        resolve(convertDBDataToPayloadInfo(game))
      } catch {
        resolve(null)
      }
    }, 0)
  })
}
// #endregion

// #region postGame
export const postGame = async (gameInfo: PayloadGameInfoPut): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const gamesData = getGamesData()
      const game = convertPayloadInfoToDBData(gameInfo)
      gamesData.push(game)
      setGamesData(gamesData)
      resolve()
    }, 0)
  })
}
// #endregion

// #region deleteGame
export const deleteGame = async (gameId: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      let games = []
      games = getGamesData()
      games = games.filter(game => game.id !== gameId)
      setGamesData(games)
      resolve()
    }, 0)
  })
}
// #endregion

// #region getGameTurn
export const getGameTurn = async (gameId: string, playerId: string): Promise<PayloadGameTurnDataGet> => {
  return new Promise<PayloadGameTurnDataGet>((resolve) => {
    setTimeout(() => {
      const games = getGamesData()
      const game = games.find(game => game.id === gameId)
      if (game.status === GameStatus.STARTED) {
        const gamePlayer = convertDBDataToPayloadTurn(game as DatabaseGameDataStarted, playerId)
        resolve(gamePlayer)
      }
    }, 0)
  })
}
// #endregion

// #region putGameTurn
export const putGameTurn = async (gameId: string, playerId: string, turnOrders: PayloadGameTurnOrdersPut): Promise<PayloadGameInfoGet> => {
  return new Promise<PayloadGameInfoGet>((resolve) => {
    setTimeout(() => {
      const games = getGamesData()
      const gameData = games.find(game => game.id === gameId)
      if (gameData.status !== GameStatus.STARTED) {
        throw new Error('Game is not started')
      }
      const game = gameData as DatabaseGameDataStarted
      if (game.turn !== turnOrders.turn) {
        throw new Error('Game is not started')
      }
      const player: DatabaseGameDataStartedPlayer = game.players.find(p => p.id === playerId)
      player.status = PlayerTurnState.VALIDATED
      turnOrders.unitOrders.forEach(
        unitOrder => {
          const unit = game.units.find(u => u.id === unitOrder.unitId)
          unit.order = {
            key: unitOrder.key,
            data: unitOrder.data,
          }
        }
      )
      setGamesData(games)
      resolve(convertDBDataToPayloadInfo(game))
    }, 0)
  })
}
// #endregion

// #region postGameTurn
export const postGameTurn = async (gameId: string): Promise<PayloadGameInfoGet> => {
  return new Promise<PayloadGameInfoGet>((resolve) => {
    setTimeout(() => {
      const games = getGamesData()
      const gameData = games.find(game => game.id === gameId)
      if (!gameData) {
        throw new Error('Game does not exists')
      }
      if (gameData.status !== GameStatus.STARTED) {
        throw new Error('Game is not started')
      }
      const game = gameData as DatabaseGameDataStarted
      game.turn++
      game.units.forEach(
        unit => {
          if (unit.order) {
            switch (unit.order.key) {
              case UnitOrder.MOVE: {
                const data: any = unit.order.data
                unit.tileId = game.map.tiles[data.x][data.y].id
                unit.order = null
                break
              }
              case UnitOrder.HOLD: {
                break
              }
              case UnitOrder.NONE: {
                unit.order = null
                break
              }
            }
          }
        }
      )
      game.players.forEach(
        player => {
          player.status = PlayerTurnState.UNPLAYED
        }
      )
      setGamesData(games)
      resolve(convertDBDataToPayloadInfo(game))
    }, 0)
  })
}
// #endregion

export const GameLocalService: GameService = {
  getGames,
  getGame,
  postGame,
  deleteGame,

  getGameTurn,
  putGameTurn,
  postGameTurn,
}
