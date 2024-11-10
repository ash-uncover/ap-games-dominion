import { PlayerLevel } from '../constants/PlayerLevel'
import { PlayerType } from '../constants/PlayerType'
import { UnitOrder } from '../constants/UnitOrder'
import { GameStatus } from '../constants/GameStatus'
import { PlayerTurnState } from '../constants/PlayerTurnState'
import { CommonUnitOrder } from '../common/CommonUnitOrder'

export interface DatabaseGameData {
  id: string
  name: string
  password: string

  status: GameStatus
  setup: DatabaseGameSetup  
}

export interface DatabaseGameSetup {
  map: {
    width: number
    height: number
  }
}
export interface DatabaseGameDataPlayer {
  id: string
  name: string
  nation: string
  type: PlayerType
  level: PlayerLevel 
}

export interface DatabaseGameDataPending extends DatabaseGameData {
  status: GameStatus.PENDING,
  players: DatabaseGameDataPendingPlayer[]
}
export interface DatabaseGameDataPendingPlayer extends DatabaseGameDataPlayer {}

export interface DatabaseGameDataStarted extends DatabaseGameData {
  status: GameStatus.STARTED
  turn: number
  map: DatabaseGameDataStartedMap
  players: DatabaseGameDataStartedPlayer[]
  buildings: DatabaseGameDataStartedBuilding[]
  units: DatabaseGameDataStartedUnit[]
}

export interface DatabaseGameDataStartedMap {
  tiles: DatabaseGameDataStartedTile[][]
}

export interface DatabaseGameDataStartedTile {
  id: string
  x: number
  y: number
}

export interface DatabaseGameDataStartedPlayer extends DatabaseGameDataPlayer {
  status: PlayerTurnState
}

export interface DatabaseGameDataStartedBuilding {
  id: string
  name: string

  playerId: string
  tileId: string
}

export interface DatabaseGameDataStartedUnit {
  id: string
  name: string

  playerId: string
  tileId: string
  order: DatabaseGameDataStartedUnitOrder
}

export interface DatabaseGameDataStartedUnitOrder extends CommonUnitOrder {}