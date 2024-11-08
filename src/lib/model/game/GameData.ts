import { GameSetup } from './GameSetup'
import { GameStatus } from '../constants/GameStatus'
import { PlayerLevel } from '../constants/PlayerLevel'
import { PlayerType } from '../constants/PlayerType'
import { UnitOrder } from '../constants/UnitOrder'

export interface GameData {
  id: string
  name: string
  password: string

  turn: number
  status: GameStatus
  setup: GameSetup
  
  map: GameDataMap
  players: GameDataPlayer[]
  buildings: GameDataBuilding[]
  units: GameDataUnit[]
}

export interface GameDataMap {
  tiles: GameDataTile[][]
}

export interface GameDataTile {
  id: string
  x: number
  y: number
}

export interface GameDataPlayer {
  id: string
  name: string
  nation: string
  type: PlayerType
  level: PlayerLevel
}

export interface GameDataBuilding {
  id: string
  name: string

  player: string
  tile: string
}

export interface GameDataUnit {
  id: string
  name: string
  order: GameDataUnitOrder | null

  player: string
  tile: string
}

export interface GameDataUnitOrder {
  key: UnitOrder
  data?: any
}