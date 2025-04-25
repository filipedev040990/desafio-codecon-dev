import { ControllerInterface, HttpResponse } from '@/controllers/types'
import { AppContainer } from '@/infra/container/modules'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { ListSuperUsersUseCaseInterface } from '@/usecases/list-super-users/types'

export default class ListSuperUsersController implements ControllerInterface {
  private readonly listSuperUsersUseCase: ListSuperUsersUseCaseInterface
  private readonly loggerService: LoggerServiceInterface

  constructor(params: AppContainer) {
    this.listSuperUsersUseCase = params.listSuperUsersUsecase
    this.loggerService = params.loggerService
  }

  async execute(): Promise<HttpResponse> {
    try {
      const output = await this.listSuperUsersUseCase.execute()
      return success(200, output)
    } catch (error) {
      this.loggerService.error('Error listing super users', { error })
      return handleError(error)
    }
  }
}
