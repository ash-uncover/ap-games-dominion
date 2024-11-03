import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import Language from '../../lib/utils/language'

import { DataState, DataLoadStatus, DataLoadStatuses } from './data.state'

// STATE //

const initialState: DataState = {
  embedded: false,

  language: Language.FRENCH.id,

  loadStatus: DataLoadStatuses.NONE
}

// REDUCERS //

interface PayloadEmbedded {
  embedded: boolean
}
const setEmbedded: CaseReducer<DataState, PayloadAction<PayloadEmbedded>> = (state, action) => {
  const {
    embedded
  } = action.payload
  state.embedded = embedded
}

const setLanguage: CaseReducer<DataState, PayloadAction<string>> = (state, action) => {
  state.language = action.payload
}

const setLoadStatus: CaseReducer<DataState, PayloadAction<DataLoadStatus>> = (state, action) => {
  state.loadStatus = action.payload
}

// SLICE //

const DataSlice = createSlice({
  name: 'Data',
  initialState,

  reducers: {
    setLanguage,
    setEmbedded,
    setLoadStatus,
  },
})

export default DataSlice
