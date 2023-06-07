import { User, TPassword } from '@types'
import BaseAPI from './base-api'

class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user')
  }
  public updateProfile(data: User): Promise<unknown> {
    return this.http.put(`/profile`, {
      data,
    })
  }

  public updateAvatar(data: User): Promise<unknown> {
    return this.http.put(`/profile/avatar`, { data })
  }

  public updatePassword(data: TPassword): Promise<unknown> {
    return this.http.put(`/password`, { data })
  }

  create = undefined

  update = undefined

  delete = undefined

  read = undefined
}

export { ProfileAPI }
