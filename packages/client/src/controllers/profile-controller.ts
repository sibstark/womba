import { ProfileAPI } from '@api'
import { User, TPassword } from '@types'

class ProfileController {
  private api: ProfileAPI
  constructor() {
    this.api = new ProfileAPI()
  }

  async updateProfile(data: User) {
    try {
      await this.api.updateProfile(data)
    } catch (e) {
      console.log('updateProfile: ', e)
    } finally {
      console.log('Profile updated')
    }
  }

  async updateAvatar(data: User) {
    try {
      await this.api.updateAvatar(data)
    } catch (e: any) {
      console.log('updateAvatar: ', e)
    } finally {
      console.log('Avatar updated')
    }
  }

  async updatePassword(data: TPassword) {
    try {
      await this.api.updatePassword(data)
    } catch (e) {
      console.log('updatePassword: ', e)
    }
  }
}

export const profileController = new ProfileController()
