import { PlayerRelationship } from '../constants/PlayerRelationship'
import { PlayerTurnState } from '../constants/PlayerTurnState'
import { TileVisibility } from '../constants/TileVisiblity'
import { PayloadGameTurnDataGet } from '../payload/PayloadGameTurnDataGet'
import { DatabaseGameDataStarted } from './DatabaseGameData'

export const convertDBDataToPayloadTurn = (gameData: DatabaseGameDataStarted, playerId: string): PayloadGameTurnDataGet => {
  const playerData = gameData.players.find(player => player.id === playerId)
  const turnData: PayloadGameTurnDataGet = {
    gameId: gameData.id,
    playerId,
    turn: gameData.turn,
    status: playerData.status || PlayerTurnState.UNPLAYED,

    map: {
      tiles: gameData.map.tiles.map(
        row => row.map(
          tile => {
            return {
              ...tile,
              visibility: TileVisibility.SCOUTED
            }
          }
        )
      )
    },
    players: gameData.players.map(
      player => {
        if (player.id === playerId) {
          return {
            ...player,
            relationship: PlayerRelationship.SELF
          }
        }
        return {
          ...player,
          relationship: PlayerRelationship.WAR
        }
      }
    ),
    buildings: gameData.buildings.map(
      building => {
        return {
          ...building
        }
      }
    ),
    units: gameData.units.map(
      unit => {
        return {
          ...unit
        }
      }
    )
  }
  return turnData;
}

