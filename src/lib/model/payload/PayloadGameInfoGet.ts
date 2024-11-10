import { CommonGameSetup } from '../common/CommonGameSetup'
import { GameStatus } from '../constants/GameStatus'
import { PlayerLevel } from '../constants/PlayerLevel'
import { PlayerTurnState } from '../constants/PlayerTurnState'
import { PlayerType } from '../constants/PlayerType'

export interface PayloadGameInfoGet {
  id: string
  name: string
  password?: string
  status: GameStatus
  turn: number
  setup: PayloadGameInfoGetSetup
  players: PayloadGameInfoGetPlayer[]
}
export interface PayloadGameInfoGetSetup extends CommonGameSetup {}
export interface PayloadGameInfoGetPlayer {
  id: string
  name: string
  nation: string
  type: PlayerType
  level: PlayerLevel
  status: PlayerTurnState
}
