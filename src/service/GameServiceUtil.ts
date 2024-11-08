import { GameInfo, GameInfoPlayer } from '../lib/model/game/GameInfo'
import { GameData, GameDataBuilding, GameDataPlayer, GameDataTile, GameDataUnit } from '../lib/model/game/GameData'
import { GameStatuses } from '../lib/model/constants/GameStatus'
import { UnitOrders } from '../lib/model/constants/UnitOrder'
import { nameToId } from '../lib/utils/names'

export const extractGameInfo = (gameData: GameData): GameInfo => {
  const gameInfo: GameInfo = {
    id: gameData.id,
    name: gameData.name,
    status: gameData.status,
    setup: gameData.setup,
    players: gameData.players.map(
      (player: GameDataPlayer): GameInfoPlayer => ({
        id: player.id,
        name: player.name,
        nation: player.nation,
        type: player.type,
        level: player.level,
      })
    )
  }
  return gameInfo
}

export const extractGameData = (gameInfo: GameInfo): GameData => {
  const gameData: GameData = {
    id: gameInfo.id,
    name: gameInfo.name,
    password: gameInfo.password,
    status: gameInfo.status,
    turn: 1,
    setup: gameInfo.setup,
    map: { tiles: [] },
    players: gameInfo.players.map((playerInfo) => {
      // Create player
      const playerId = nameToId(playerInfo.name)
      const playerData: GameDataPlayer = {
        id: playerId,
        name: playerInfo.name,
        nation: playerInfo.nation,
        type: playerInfo.type,
        level: playerInfo.level,
      }
      return playerData
    }),
    buildings: [],
    units: [],
  }

  if (gameInfo.status === GameStatuses.STARTED) {
    // Setup Map
    for (let x = 0 ; x < gameData.setup.map.width ; x++) {
      const row: GameDataTile[] = []
      for (let y = 0 ; y < gameData.setup.map.height ; y++) {
        const tileId = `tile-${x}-${y}`
        const tile: GameDataTile = {
          id: tileId,
          x,
          y,
        }
        row.push(tile)
      }
      gameData.map.tiles.push(row)
    }

    // Setup Players
    Object.values(gameInfo.players).forEach((playerInfo, index) => {
      // Create player
      const playerId = nameToId(playerInfo.name)

      // Resolve start position
      const randomWidth =  Math.floor(Math.random() * gameData.setup.map.width)
      const randomHeight =  Math.floor(Math.random() * gameData.setup.map.height)
      const randomTile = gameData.map.tiles[randomHeight][randomWidth]
      
      // Create initial building
      const buildingId = `building-${index}`
      const buildingData: GameDataBuilding = {
        id: buildingId,
        name: buildingId,
        player: playerId,
        tile: randomTile.id
      }
      gameData.buildings.push(buildingData)

      // Create initial units
      const unitId1 = `unit-${index}-1`
      const unit1: GameDataUnit = {      
        id: unitId1,
        name: unitId1,
        player: playerId,
        tile: randomTile.id,
        order: { key: UnitOrders.NONE }
      }
      gameData.units.push(unit1)

      const unitId2 = `unit-${index}-2`
      const unit2: GameDataUnit = {
        id: unitId2,
        name: unitId2,
        player: playerId,
        tile: randomTile.id,
        order: { key: UnitOrders.NONE }
      }
      gameData.units.push(unit2)
    })
  }

  return gameData
}

export const extractGamePlayer = (gameData: GameData, playerId: string): GameData => {
  const gamePlayer: GameData = {
    id: gameData.id,
    name: gameData.name,
    password: gameData.password,
    status: gameData.status,
    turn: gameData.turn,
    setup: gameData.setup,
    map: gameData.map,
    players: gameData.players,
    buildings: gameData.buildings.filter(building => building.player === playerId),
    units: gameData.units.filter(unit => unit.player === playerId)
  }
  return gamePlayer
}