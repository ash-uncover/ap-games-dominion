import { CommonGameSetup } from '../common/CommonGameSetup'
import { GameStatus } from '../constants/GameStatus'
import { PlayerLevel } from '../constants/PlayerLevel'
import { PlayerType } from '../constants/PlayerType'

export interface PayloadGameInfoPut {
  id: string
  name: string
  password: string
  status: GameStatus
  setup: PayloadGameInfoPutSetup
  players: PayloadGameInfoPutPlayer[]
}
export interface PayloadGameInfoPutSetup extends CommonGameSetup {}
export interface PayloadGameInfoPutPlayer {
  name: string
  password?: string
  nation: string
  type: PlayerType
  level: PlayerLevel
}