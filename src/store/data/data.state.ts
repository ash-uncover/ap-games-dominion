export type DataLoadStatus =
  'NONE' |
  'LOADING' |
  'READY' |
  'STARTED'

export const DataLoadStatuses: {
  NONE: DataLoadStatus
  LOADING: DataLoadStatus
  READY: DataLoadStatus
  STARTED: DataLoadStatus
} = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  READY: 'READY',
  STARTED: 'STARTED',
}

export interface DataState {
  embedded: boolean

  language: string

  loadStatus: DataLoadStatus
}