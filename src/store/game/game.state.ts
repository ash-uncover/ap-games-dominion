import { DataState } from '@uncover/js-utils'
import { UnitOrder } from '../../lib/model/constants/UnitOrder'

export interface GameState {
  id: string
  name: string
  turn: number
  player: string
  map: GameMap
  
  selectedTile: string
  selectedUnits: string[]
  
  tiles: Record<string, GameTile>
  players: Record<string, GamePlayer>
  buildings: Record<string, GameBuilding>
  units: Record<string, GameUnit>

  getGameTurnState: DataState
  getGameTurnError: string

  putGameTurnState: DataState
  putGameTurnError: string
}

export interface GameMap {
  tiles: string[][]
}

export interface GameTile {
  id: string
  x: number
  y: number
  selected?: boolean
  
  buildings: string[]
  units: string[]
}

export interface GamePlayer {
  id: string
  name: string
  nation: string
  
  buildings: string[]
  units: string[]
}

export interface GameBuilding {
  id: string
  player: string
  tile: string
  name: string
}

export interface GameUnit {
  id: string
  player: string
  tile: string
  name: string

  selected?: boolean
  order: GameUnitOrder | null
}

export interface GameUnitOrder {
  key: UnitOrder
  data?: any
}