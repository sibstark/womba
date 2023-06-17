import { User, TPassword } from '@types'
import BaseAPI from './base-api'
import { TOptions } from '@utils'

class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user')
  }
  public updateProfile(data: User): Promise<unknown> {
    return this.http.put(`/profile`, {
      data,
    })
  }

  public updateAvatar(data: TOptions): Promise<unknown> {
    data.headers = {
      'Content-Type': 'multipart/form-data',
    }
    return this.http.put(`/profile/avatar`, data)
  }

  public updatePassword(data: TPassword): Promise<unknown> {
    return this.http.put(`/password`, { data })
  }
}

export { ProfileAPI }
