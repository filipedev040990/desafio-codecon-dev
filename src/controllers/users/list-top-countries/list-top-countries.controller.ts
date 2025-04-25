import { ControllerInterface, HttpResponse } from '@/controllers/types'
import { AppContainer } from '@/infra/container/modules'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { ListTopCountriesUsecaseInterface } from '@/usecases/users/list-top-countries/types'

export default class ListTopCountriesController implements ControllerInterface {
  private readonly listTopCountriesUsecase: ListTopCountriesUsecaseInterface
  private readonly loggerService: LoggerServiceInterface

  constructor(params: AppContainer) {
    this.listTopCountriesUsecase = params.listTopCountriesUsecase
    this.loggerService = params.loggerService
  }

  async execute(): Promise<HttpResponse> {
    try {
      const output = await this.listTopCountriesUsecase.execute()
      return success(200, output)
    } catch (error) {
      this.loggerService.error('Error listing top countries', { error })
      return handleError(error)
    }
  }
}
