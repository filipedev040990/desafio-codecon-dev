import { UserRepositoryData, UserRepositoryInterface } from './types'

export default class UserRepository implements UserRepositoryInterface {
  public users: UserRepositoryData[] = []

  async save(input: UserRepositoryData): Promise<void> {
    this.users.push(input)
  }
}
