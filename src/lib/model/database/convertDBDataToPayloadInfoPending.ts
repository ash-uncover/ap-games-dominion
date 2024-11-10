import { PlayerTurnState } from '../constants/PlayerTurnState'
import { PayloadGameInfoGet, PayloadGameInfoGetPlayer } from '../payload/PayloadGameInfoGet'
import { DatabaseGameDataPending, DatabaseGameDataPendingPlayer } from './DatabaseGameData'

// #region convertDBDataToPayloadInfoPending
export const convertDBDataToPayloadInfoPending = (gameData:DatabaseGameDataPending): PayloadGameInfoGet => {
  const gameInfo: PayloadGameInfoGet = {
    id: gameData.id,
    name: gameData.name,
    status: gameData.status,
    turn: -1,
    setup: gameData.setup,
    players: gameData.players.map(
      (player: DatabaseGameDataPendingPlayer): PayloadGameInfoGetPlayer => ({
        id: player.id,
        name: player.name,
        nation: player.nation,
        type: player.type,
        level: player.level,
        status: PlayerTurnState.UNPLAYED
      })
    )
  }
  return gameInfo
}
// #region