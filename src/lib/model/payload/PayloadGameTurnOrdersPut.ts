import { CommonUnitOrder } from '../common/CommonUnitOrder'
import { PlayerTurnState } from '../constants/PlayerTurnState'

export interface PayloadGameTurnOrdersPut {
  gameId: string
  playerId: string
  turn: number
  status: PlayerTurnState
  
  unitOrders: PayloadGameTurnOrdersPutUnitOrder[]
}
export interface PayloadGameTurnOrdersPutUnitOrder extends CommonUnitOrder {
  unitId: string
}