import { GameStatus } from '../constants/GameStatus'
import { PayloadGameInfoGet } from '../payload/PayloadGameInfoGet'
import { DatabaseGameData, DatabaseGameDataPending, DatabaseGameDataStarted } from './DatabaseGameData'
import { convertDBDataToPayloadInfoPending } from './convertDBDataToPayloadInfoPending'
import { convertDBDataToPayloadInfoStarted } from './convertDBDataToPayloadInfoStarted'

export const convertDBDataToPayloadInfo = (gameData: DatabaseGameData): PayloadGameInfoGet => {
  switch (gameData.status) {
    case GameStatus.PENDING: {
      return convertDBDataToPayloadInfoPending(gameData as DatabaseGameDataPending)
    }
    case GameStatus.STARTED: {
      return convertDBDataToPayloadInfoStarted(gameData as DatabaseGameDataStarted)
    }
  }
  throw new Error('Unknow status')
}

