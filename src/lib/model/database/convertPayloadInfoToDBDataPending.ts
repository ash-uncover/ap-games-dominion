import { nameToId } from '../../utils/names'
import { PayloadGameInfoPut } from '../payload/PayloadGameInfoPut'
import { DatabaseGameDataPending, DatabaseGameDataPendingPlayer } from './DatabaseGameData'
import { GameStatus } from '../constants/GameStatus'

// #region convertPayloadInfoToDBDataPending
export const convertPayloadInfoToDBDataPending = (gameInfo: PayloadGameInfoPut): DatabaseGameDataPending => {
  const gameData: DatabaseGameDataPending = {
    id: gameInfo.id || nameToId(gameInfo.name),
    name: gameInfo.name,
    password: gameInfo.password,
    status: GameStatus.PENDING,
    setup: gameInfo.setup,
    players: gameInfo.players.map((playerInfo) => {
      const playerId = nameToId(playerInfo.name)
      const playerData: DatabaseGameDataPendingPlayer = {
        id: playerId,
        name: playerInfo.name,
        nation: playerInfo.nation,
        type: playerInfo.type,
        level: playerInfo.level,
      }
      return playerData
    })
  }
  return gameData
}
//#endregion
