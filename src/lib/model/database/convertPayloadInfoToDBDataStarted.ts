import { nameToId } from '../../utils/names'
import { PayloadGameInfoPut } from '../payload/PayloadGameInfoPut'
import { DatabaseGameDataStarted, DatabaseGameDataStartedBuilding, DatabaseGameDataStartedPlayer, DatabaseGameDataStartedTile, DatabaseGameDataStartedUnit } from './DatabaseGameData'
import { GameStatus } from '../constants/GameStatus'
import { UnitOrder } from '../constants/UnitOrder'
import { PlayerTurnState } from '../constants/PlayerTurnState'

// #region convertPayloadInfoToDBDataStarted
export const convertPayloadInfoToDBDataStarted = (gameInfo: PayloadGameInfoPut): DatabaseGameDataStarted => {
  // Create tiles
  const tiles = [  ]
  for (let x = 0 ; x < gameInfo.setup.map.width ; x++) {
    const row: DatabaseGameDataStartedTile[] = []
    for (let y = 0 ; y < gameInfo.setup.map.height ; y++) {
      const tileId = `tile-${x}-${y}`
      const tile: DatabaseGameDataStartedTile = {
        id: tileId,
        x,
        y,
      }
      row.push(tile)
    }
    tiles.push(row)
  }

  // Create players
  const buildings: DatabaseGameDataStartedBuilding[] = []
  const units: DatabaseGameDataStartedUnit[] = []
  const players = gameInfo.players.map((playerInfo, index) => {
    const playerId = nameToId(playerInfo.name)
    const playerData: DatabaseGameDataStartedPlayer = {
      id: playerId,
      name: playerInfo.name,
      status: PlayerTurnState.UNPLAYED,
      nation: playerInfo.nation,
      type: playerInfo.type,
      level: playerInfo.level,
    }

    const randomWidth =  Math.floor(Math.random() * gameInfo.setup.map.width)
    const randomHeight =  Math.floor(Math.random() * gameInfo.setup.map.height)
    const randomTile = tiles[randomHeight][randomWidth]

    // Create initial building
    const buildingId = `building-${index}`
    const buildingData: DatabaseGameDataStartedBuilding = {
      id: buildingId,
      name: buildingId,
      playerId: playerId,
      tileId: randomTile.id
    }
    buildings.push(buildingData)

    // Create initial units
    const unitId1 = `unit-${index}-1`
    const unit1: DatabaseGameDataStartedUnit = {      
      id: unitId1,
      name: unitId1,
      playerId: playerId,
      tileId: randomTile.id,
      order: { key: UnitOrder.NONE }
    }
    units.push(unit1)

    const unitId2 = `unit-${index}-2`
    const unit2: DatabaseGameDataStartedUnit = {
      id: unitId2,
      name: unitId2,
      playerId: playerId,
      tileId: randomTile.id,
      order: { key: UnitOrder.NONE }
    }
    units.push(unit2)
    return playerData
  })

  const gameData: DatabaseGameDataStarted = {
    id: gameInfo.id || nameToId(gameInfo.name),
    name: gameInfo.name,
    password: gameInfo.password,
    status: GameStatus.STARTED,
    turn: 1,
    setup: gameInfo.setup,

    map: { tiles },
    players,
    buildings,
    units,
  }
  return gameData
}
//#endregion