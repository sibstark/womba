import { AuthAPI } from '@api'
import { SigninRequest, SignupRequest } from '@types'

class AuthController {
  private api: AuthAPI
  constructor() {
    this.api = new AuthAPI()
  }

  async signup(data: SignupRequest) {
    try {
      await this.api.signup(data)
    } catch (e) {
      console.log('signup', e)
    } finally {
      console.log('signed up')
    }
  }

  async signin(data: SigninRequest) {
    try {
      await this.api.singin(data)
      alert('Вы залогинены')
    } catch (e: any) {
      alert(`Ошбка логина ${e.reason}`)
      console.log('signed in', e)
    } finally {
      console.log('signed in')
    }
  }

  async logout() {
    try {
      await this.api.logout()
    } catch (e) {
      console.log('logout', e)
    }
  }
}

export const authController = new AuthController()
