import { AuthAPI } from '@api'
import { SigninRequest, SignupRequest } from '@types'

class AuthController {
  private api: AuthAPI

  constructor() {
    this.api = new AuthAPI()
  }

  async signIn(data: SigninRequest) {
    return this.api.singin(data)
  }

  async signup(data: SignupRequest) {
    try {
      await this.api.signup(data)
      console.log('signed up')
    } catch (e) {
      console.log('signup error', e)
    }
  }

  async logout() {
    try {
      await this.api.logout()
    } catch (e) {
      console.log('logout error', e)
    }
  }

  async fetchUser() {
    return this.api.getUser()
  }
}

export const authController = new AuthController()
