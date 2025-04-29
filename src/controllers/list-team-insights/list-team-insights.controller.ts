import { ControllerInterface, HttpResponse } from '@/controllers/types'
import { AppContainer } from '@/infra/container/modules'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { ListTeamInsightsUsecaseInterface } from '@/usecases/list-team-insights/types'

export default class ListTeamInsightsController implements ControllerInterface {
  private readonly listTeamInsightsUsecase: ListTeamInsightsUsecaseInterface
  private readonly loggerService: LoggerServiceInterface

  constructor(params: AppContainer) {
    this.listTeamInsightsUsecase = params.listTeamInsightsUsecase
    this.loggerService = params.loggerService
  }

  async execute(): Promise<HttpResponse> {
    try {
      const output = await this.listTeamInsightsUsecase.execute()
      return success(200, output)
    } catch (error) {
      this.loggerService.error('Error listing team insights', { error })
      return handleError(error)
    }
  }
}
