import { PayloadGameInfoPut } from '../payload/PayloadGameInfoPut'
import { DatabaseGameData } from './DatabaseGameData'
import { GameStatus } from '../constants/GameStatus'
import { convertPayloadInfoToDBDataPending } from './convertPayloadInfoToDBDataPending'
import { convertPayloadInfoToDBDataStarted } from './convertPayloadInfoToDBDataStarted'

// #region convertPayloadInfoToDBData
export const convertPayloadInfoToDBData = (gameInfo: PayloadGameInfoPut): DatabaseGameData => {
  switch (gameInfo.status) {
    case GameStatus.PENDING: {
      return convertPayloadInfoToDBDataPending(gameInfo)
    }
    case GameStatus.STARTED: {
      return convertPayloadInfoToDBDataStarted(gameInfo)
    }
  }
  throw new Error('Unknow status')
}
//#endregion


