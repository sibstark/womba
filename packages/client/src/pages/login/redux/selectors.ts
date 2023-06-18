import { RootState } from '../../../store'

export function getLogin(state: RootState) {
  return state.user.login
}
