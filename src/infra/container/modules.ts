import { SaveUserUsecaseInterface } from '@/usecases/save-user/types'
import { UserRepositoryInterface } from '../database/repositories/in-memory/types'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { ListSuperUsersUseCaseInterface } from '@/usecases/list-super-users/types'
import { ListTopCountriesUsecaseInterface } from '@/usecases/list-top-countries/types'
import { ListTeamInsightsUsecaseInterface } from '@/usecases/list-team-insights/types'
import { ListActiveUsersPerDayUsecaseInterface } from '@/usecases/list-active-users-per-day/types'
import { createContainer, asClass } from 'awilix'
import path from 'path'
import lodash from 'lodash'

export type AppContainer = {
  saveUserUsecase: SaveUserUsecaseInterface
  userRepository: UserRepositoryInterface
  loggerService: LoggerServiceInterface
  listSuperUsersUsecase: ListSuperUsersUseCaseInterface
  listTopCountriesUsecase: ListTopCountriesUsecaseInterface
  listTeamInsightsUsecase: ListTeamInsightsUsecaseInterface
  listActiveUsersPerDayUsecase: ListActiveUsersPerDayUsecaseInterface
}

const container = createContainer()

const distDir = path.join(__dirname, '../../')

container.loadModules(
  [path.join(distDir, 'controllers/**/*.js'), path.join(distDir, 'usecases/**/**/*.js'), path.join(distDir, 'infra/database/repositories/**/*.js'), path.join(distDir, 'shared/services/**/*.js')],
  {
    formatName: (name: string) => {
      name = lodash.camelCase(name)

      return name
    },
    resolverOptions: {
      lifetime: 'SINGLETON',
      register: asClass,
    },
  }
)

export { container }
