import { combineReducers, configureStore } from '@reduxjs/toolkit'


import { apiSlice } from './api/apiSlice'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(apiSlice.middleware)
})

export default store
