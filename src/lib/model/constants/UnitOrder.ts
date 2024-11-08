export type UnitOrder =
  | 'NONE'
  | 'HOLD'
  | 'MOVE'

export const UnitOrders: {
  NONE: UnitOrder
  HOLD: UnitOrder
  MOVE: UnitOrder
} = {
  NONE: 'NONE',
  HOLD: 'HOLD',
  MOVE: 'MOVE',
}
