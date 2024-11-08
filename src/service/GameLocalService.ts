import { GameData } from '../lib/model/game/GameData'
import { GameInfo } from '../lib/model/game/GameInfo'
import { GameService } from './GameService'
import { extractGameData, extractGamePlayer } from './GameServiceUtil'

function getGamesData(): GameData[] {
  try {
    return JSON.parse(localStorage.getItem('AP_DOM_LOCAL_GAMES') || '[]')
  } catch {
    return []
  }
}
function setGamesData(games: GameData[]) {
  localStorage.setItem('AP_DOM_LOCAL_GAMES', JSON.stringify(games || []))
}

// #region getGames
export const getGames = async (): Promise<GameInfo[]> => {
  return new Promise<GameInfo[]>((resolve) => {
    setTimeout(() => {
      try {
        const gamesData = getGamesData()
        const games = gamesData.map(game => {
          return game
        })
        resolve(games)
      } catch {
        resolve([])
      }
    }, 0)
  })
}
// #endregion

// #region postGame
export const postGame = (gameInfo: GameInfo) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const gamesData = getGamesData()
      const game = extractGameData(gameInfo)
      gamesData.push(game)
      setGamesData(gamesData)
      resolve()
    }, 0)
  })
}
// #endregion

// #region deleteGame
export const deleteGame = (gameId: string) => {
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
export const getGameTurn = (gameId: string, playerId: string): Promise<GameData> => {
  return new Promise<GameData>((resolve) => {
    setTimeout(() => {
      const games = getGamesData()
      const game = games.find(game => game.id === gameId)
      const gamePlayer = extractGamePlayer(game, playerId)
      resolve(gamePlayer)
    }, 0)
  })
}
// #endregion

// #region putGameTurn
export const putGameTurn = (gameId: string, playerId: string, turn: GameData): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const games = getGamesData()
      const game = games.filter(game => game.id === gameId)
      resolve()
    }, 0)
  })
}
// #endregion

export const GameLocalService: GameService = {
  getGames,
  postGame,
  deleteGame,

  getGameTurn,
  putGameTurn,
}
