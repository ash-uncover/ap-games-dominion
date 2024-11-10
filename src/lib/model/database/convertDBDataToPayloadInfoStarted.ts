import { PayloadGameInfoGet, PayloadGameInfoGetPlayer } from '../payload/PayloadGameInfoGet'
import { DatabaseGameDataStarted, DatabaseGameDataStartedPlayer } from './DatabaseGameData'

// #region convertDBDataToPayloadInfoStarted
export const convertDBDataToPayloadInfoStarted = (gameData:DatabaseGameDataStarted): PayloadGameInfoGet => {
  const gameInfo: PayloadGameInfoGet = {
    id: gameData.id,
    name: gameData.name,
    status: gameData.status,
    turn: gameData.turn,
    setup: gameData.setup,
    players: gameData.players.map(
      (player: DatabaseGameDataStartedPlayer): PayloadGameInfoGetPlayer => ({
        id: player.id,
        name: player.name,
        nation: player.nation,
        type: player.type,
        level: player.level,
        status: player.status,
      })
    )
  }
  return gameInfo
}
// #region