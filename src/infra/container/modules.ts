import { SaveUserUsecaseInterface } from '@/usecases/users/save/types'
import { UserRepositoryInterface } from '../database/repositories/in-memory/types'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { createContainer, asClass } from 'awilix'
import path from 'path'
import lodash from 'lodash'

export type AppContainer = {
  saveUserUsecase: SaveUserUsecaseInterface
  userRepository: UserRepositoryInterface
  loggerService: LoggerServiceInterface
}

const container = createContainer()

const distDir = path.join(__dirname, '../../')

container.loadModules(
  [path.join(distDir, 'controllers/**/*.js'), path.join(distDir, 'usecases/**/**/*.js'), path.join(distDir, 'infra/database/repositories/*.js'), path.join(distDir, 'shared/services/**/*.js')],
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
