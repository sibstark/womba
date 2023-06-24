import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UserState } from './types/state'
import { AuthAPI } from '@api'
import { SigninRequest } from '@types'
import { useDispatch } from 'react-redux'

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

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: SigninRequest) => {
    const api = new AuthAPI()

    await api.singin(data)
    return await api.getUser()
  }
)

export const userSlice = createSlice({
  initialState: getInitialState(),
  name: 'user',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})
