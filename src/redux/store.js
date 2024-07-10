import { combineReducers, configureStore } from '@reduxjs/toolkit'

// import userInfoReducer from './slices/userinfoSlice'

// import favoritesProgramSlice from './slices/favoritesProgramSlice'

import { apiSlice } from './api/apiSlice'

const rootReducer = combineReducers({
  // form: userInfoReducer,
  // favorites: favoritesProgramSlice,
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
