import { HttpServiceInterface } from '@/shared/services/http/http.service.interface'
import { EndpointResponse, EvaluationUsecaseInterface, EvaluationUsecaseOutput } from './types'
import { AppContainer } from '@/infra/container/modules'
import { PATHS_TO_TEST, URL_PROJECT } from '@/shared/constants'

export default class EvaluationUsecase implements EvaluationUsecaseInterface {
  private readonly httpService: HttpServiceInterface

  constructor(params: AppContainer) {
    this.httpService = params.httpService
  }

  async execute(): Promise<EvaluationUsecaseOutput> {
    const tested_endpoints: EndpointResponse = {}

    for (const path of PATHS_TO_TEST) {
      const fullUrl = `${URL_PROJECT}${path}`
      const response = await this.httpService.get(fullUrl)

      tested_endpoints[path] = {
        status: response.status,
        time_ms: response.timeMs,
        valid_response: response.status === 200,
      }
    }
    return { tested_endpoints }
  }
}
