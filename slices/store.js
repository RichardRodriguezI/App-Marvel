import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { marvelApi } from '../pages/api/api'

export const store = configureStore( {
    reducer: {
        [marvelApi.reducerPath]: marvelApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(marvelApi.middleware),
})
setupListeners(store.dispatch)