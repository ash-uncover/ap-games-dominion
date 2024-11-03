export interface GameState {
  turn: number
  map: GameMap
  
  selectedTile: string
  selectedUnits: string[]
  
  tiles: Record<string, GameTile>
  players: Record<string, GamePlayer>
  buildings: Record<string, GameBuilding>
  units: Record<string, GameUnit>
}

export interface GameMap {
  width: number
  height: number
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
  owner: string
  tile: string
  name: string
}

export interface GameUnit {
  id: string
  owner: string
  tile: string
  name: string

  selected?: boolean
}