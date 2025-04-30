import { ControllerInterface, HttpResponse } from '@/controllers/types'
import { AppContainer } from '@/infra/container/modules'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { EvaluationUsecaseInterface } from '@/usecases/evaluation/types'

export default class EvalutionController implements ControllerInterface {
  private readonly evalutionUsecase: EvaluationUsecaseInterface
  private readonly loggerService: LoggerServiceInterface

  constructor(params: AppContainer) {
    this.evalutionUsecase = params.evalutionUsecase
    this.loggerService = params.loggerService
  }

  async execute(): Promise<HttpResponse> {
    try {
      const output = await this.evalutionUsecase.execute()
      return success(200, output)
    } catch (error) {
      this.loggerService.error('Error listing evalution', { error })
      return handleError(error)
    }
  }
}
