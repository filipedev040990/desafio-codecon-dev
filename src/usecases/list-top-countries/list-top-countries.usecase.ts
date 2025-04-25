import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import { ListTopCountriesOutput, ListTopCountriesUsecaseInterface } from './types'
import { AppContainer } from '@/infra/container/modules'

export default class ListTopCountriesUseCase implements ListTopCountriesUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface

  constructor(params: AppContainer) {
    this.userRepository = params.userRepository
  }

  async execute(): Promise<ListTopCountriesOutput[] | null> {
    const superUsers = await this.userRepository.listSuperUsers()

    if (!superUsers) {
      return null
    }

    return this.getTopCountries(superUsers)
  }

  getTopCountries(superUsers: UserRepositoryData[]): ListTopCountriesOutput[] {
    const countMap: Record<string, number> = {}

    for (const superUser of superUsers) {
      if (!countMap[superUser.pais]) {
        countMap[superUser.pais] = 1
      } else {
        countMap[superUser.pais] += 1
      }
    }

    const sorted = Object.entries(countMap)
      .map(([country, total]) => ({ country, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    return sorted
  }
}
