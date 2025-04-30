import { AppContainer } from '@/infra/container/modules'
import { LoggerServiceInterface } from '../logger/logger.service.interface'
import { HttpServiceInterface } from './http.service.interface'

export default class HttpService implements HttpServiceInterface {
  private readonly loggerService: LoggerServiceInterface

  constructor(params: AppContainer) {
    this.loggerService = params.loggerService
  }

  async get<T = any>(url: string): Promise<{ status: number; data: T; timeMs: number }> {
    try {
      const start = performance.now()
      const response = await fetch(url)
      const timeMs = Math.round(performance.now() - start)

      const contentType = response.headers.get('content-type')
      const data = contentType?.includes('application/json') ? await response.json() : null

      return { status: response.status, data, timeMs }
    } catch (error) {
      this.loggerService.error('Error http request', { error, url, method: 'GET' })
      throw error
    }
  }
}
