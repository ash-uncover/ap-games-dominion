import { GameSetup } from './GameSetup'
import { GameStatus } from '../constants/GameStatus'
import { PlayerLevel } from '../constants/PlayerLevel'
import { PlayerType } from '../constants/PlayerType'

export interface GameInfo {
  id: string
  name: string
  password?: string
  status: GameStatus
  setup: GameSetup 
  players: GameInfoPlayer[]
}

export interface GameInfoPlayer {
  id?: string
  name: string
  password?: string
  nation: string
  type: PlayerType
  level: PlayerLevel
}