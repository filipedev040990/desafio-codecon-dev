import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import { ListActiveUsersPerDayOutput, ListActiveUsersPerDayUsecaseInterface } from './types'
import { AppContainer } from '@/infra/container/modules'

export default class ListActiveUsersPerDayUsecase implements ListActiveUsersPerDayUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface

  constructor(params: AppContainer) {
    this.userRepository = params.userRepository
  }

  async execute(minLogins?: number): Promise<ListActiveUsersPerDayOutput | null> {
    const users = await this.userRepository.listAll()

    if (!users) {
      return null
    }

    return this.getActiveUsersPerDay(users, minLogins)
  }

  getActiveUsersPerDay(users: UserRepositoryData[], minLogins?: number): any {
    const loginCountMap: Record<string, number> = {}

    for (const user of users) {
      const userLogs = JSON.parse(user.logs)

      for (const logs of userLogs) {
        if (logs.acao === 'login') {
          loginCountMap[logs.data] = (loginCountMap[logs.data] || 0) + 1
        }
      }
    }

    let output = Object.entries(loginCountMap).map(([date, total]) => ({ date, total }))

    if (minLogins) {
      output = output.filter((o) => o.total >= minLogins)
    }

    return { logins: output.sort((a, b) => a.date.localeCompare(b.date)) }
  }
}
