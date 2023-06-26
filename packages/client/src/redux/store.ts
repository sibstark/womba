import { reducer as userReducer } from './user'
import { configureStore } from '@reduxjs/toolkit'

const reducer = {
  user: userReducer,
}

export const store = configureStore({ reducer })

export const dispatch = store.dispatch
export type RootState = ReturnType<typeof store.getState>
