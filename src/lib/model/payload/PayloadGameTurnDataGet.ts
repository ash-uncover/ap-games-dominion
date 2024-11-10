import { CommonGameSetup } from '../common/CommonGameSetup'
import { CommonUnitOrder } from '../common/CommonUnitOrder'
import { PlayerLevel } from '../constants/PlayerLevel'
import { PlayerRelationship } from '../constants/PlayerRelationship'
import { PlayerTurnState } from '../constants/PlayerTurnState'
import { PlayerType } from '../constants/PlayerType'
import { TileVisibility } from '../constants/TileVisiblity'

export interface PayloadGameTurnDataGet {
  gameId: string
  playerId: string
  turn: number
  status: PlayerTurnState

  map: PayloadGameTurnDataGetMap
  players: PayloadGameTurnDataGetPlayer[]
  buildings: PayloadGameTurnDataGetBuilding[]
  units: PayloadGameTurnDataGetUnit[]
}
export interface PayloadGameTurnDataGetSetup extends CommonGameSetup {}
export interface PayloadGameTurnDataGetMap {
  tiles: PayloadGameTurnDataGetTile[][]
}
export interface PayloadGameTurnDataGetTile {
  id: string
  x: number
  y: number
  visibility: TileVisibility
}
export interface PayloadGameTurnDataGetPlayer {
  id: string
  name: string
  nation: string
  type: PlayerType
  level: PlayerLevel
  relationship: PlayerRelationship
}
export interface PayloadGameTurnDataGetBuilding {
  id: string
  name: string
  playerId: string
  tileId: string
}
export interface PayloadGameTurnDataGetUnit {
  id: string
  name: string
  playerId: string
  tileId: string
  order: PayloadGameTurnDataGetUnitOrder | null
}
export interface PayloadGameTurnDataGetUnitOrder extends CommonUnitOrder {}
