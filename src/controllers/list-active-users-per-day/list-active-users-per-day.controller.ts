import { ControllerInterface, HttpRequest, HttpResponse } from '@/controllers/types'
import { AppContainer } from '@/infra/container/modules'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { ListActiveUsersPerDayUsecaseInterface } from '@/usecases/list-active-users-per-day/types'

export default class ListActiveUsersPerDayController implements ControllerInterface {
  private readonly listActiveUsersPerDayUsecase: ListActiveUsersPerDayUsecaseInterface
  private readonly loggerService: LoggerServiceInterface

  constructor(params: AppContainer) {
    this.listActiveUsersPerDayUsecase = params.listActiveUsersPerDayUsecase
    this.loggerService = params.loggerService
  }

  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.listActiveUsersPerDayUsecase.execute(input?.query?.minLogin)
      return success(200, output)
    } catch (error) {
      this.loggerService.error('Error listing active users per day', { error })
      return handleError(error)
    }
  }
}
