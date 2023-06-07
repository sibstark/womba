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
      console.log('Profile updated')
    } catch (e) {
      console.log('updateProfile: ', e)
    }
  }

  async updateAvatar(data: any) {
    try {
      await this.api.updateAvatar(data)
      console.log('Avatar updated')
    } catch (e: any) {
      console.log('updateAvatar: ', e)
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
