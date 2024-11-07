import { GameState } from 'src/store/game/game.state'
import { GameInfo } from 'src/store/games/games.state'
import { GameService } from './GameService'
import { UUID } from '@uncover/js-utils'

// #region getGames
export const getGames = () => {
  return new Promise<GameInfo[]>((resolve) => {
    setTimeout(() => {
      try {
        let games = []
        games = JSON.parse(localStorage.getItem('AP_DOM_LOCAL_GAMES') || '[]')
        resolve(games)
      } catch {
        resolve([])
      }
    }, 0)
  })
}
// #endregion

// #region postGame
export const postGame = (game: GameInfo) => {
  return new Promise<GameInfo>((resolve) => {
    setTimeout(() => {
      let games = []
      games = JSON.parse(localStorage.getItem('AP_DOM_LOCAL_GAMES') || '[]')
      games.push(game)
      localStorage.setItem('AP_DOM_LOCAL_GAMES', JSON.stringify(games))
      resolve(game)
    }, 0)
  })
}
// #endregion

// #region deleteGame
export const deleteGame = (gameId: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      let games = []
      games = JSON.parse(localStorage.getItem('AP_DOM_LOCAL_GAMES') || '[]')
      games = games.filter(game => game.id !== gameId)
      localStorage.setItem('AP_DOM_LOCAL_GAMES', JSON.stringify(games))
      resolve()
    }, 0)
  })
}
// #endregion

export const GameLocalService: GameService = {
  getGames,
  postGame,
  deleteGame
}
