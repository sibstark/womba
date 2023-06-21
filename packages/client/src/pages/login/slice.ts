import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserState } from './types/state'
import { User } from '@types'

function getInitialState(): UserState {
  return {
    user: {
      id: 0,
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      avatar: '',
      email: '',
      phone: '',
    },
  }
}

export const userSlice = createSlice({
  initialState: getInitialState(),
  name: 'user',
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      console.log(action.payload)
      state.user = action.payload
    },
  },
})
