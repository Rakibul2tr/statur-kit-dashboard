import { combineReducers, configureStore } from '@reduxjs/toolkit'

// import userInfoReducer from './slices/userinfoSlice'

// import favoritesProgramSlice from './slices/favoritesProgramSlice'

import { apiSlice } from './api/apiSlice'

import { programsApislice } from './api/programsApislice'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,

  [programsApislice.reducerPath]: programsApislice.reducer
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(apiSlice.middleware)
})
