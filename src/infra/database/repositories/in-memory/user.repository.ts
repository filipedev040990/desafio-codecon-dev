import { UserRepositoryData, UserRepositoryInterface } from './types'

export default class UserRepository implements UserRepositoryInterface {
  public users: UserRepositoryData[] = []

  async save(input: UserRepositoryData): Promise<void> {
    this.users.push(input)
  }

  async listSuperUsers(): Promise<UserRepositoryData[] | null> {
    const superUsers = this.users.filter((user) => user.score >= 900 && user.ativo)

    if (!superUsers.length) {
      return null
    }

    return superUsers
  }
}
