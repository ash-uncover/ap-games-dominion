import { GameInfo } from 'src/store/games/games.state'
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
  return new Promise<GameInfo>((resolve) => {
    setTimeout(() => {
      resolve(null)
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

export const GameOnlineService: GameService = {
  getGames,
  postGame,
  deleteGame
}
