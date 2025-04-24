import { ControllerInterface, HttpRequest, HttpResponse } from '@/controllers/types'
import { AppContainer } from '@/infra/container/modules'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { SaveUserUsecaseInterface } from '@/usecases/users/save/types'

export default class SaveUserController implements ControllerInterface {
  private readonly saveUserUsecase: SaveUserUsecaseInterface
  private readonly loggerService: LoggerServiceInterface

  constructor(params: AppContainer) {
    this.saveUserUsecase = params.saveUserUsecase
    this.loggerService = params.loggerService
  }

  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.saveUserUsecase.execute(input.body)
      return success(201, output)
    } catch (error) {
      this.loggerService.error('Error saving users', { error })
      return handleError(error)
    }
  }
}
