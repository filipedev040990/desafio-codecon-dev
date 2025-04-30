import { ControllerInterface, HttpRequest } from '@/controllers/types'
import { container } from '../container/modules'
import { Request, Response } from 'express'

const loggerService = container.resolve('loggerService')

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req?.body,
      params: req?.params,
      query: req?.query,
    }

    loggerService.info('Started request', {
      method: req.method,
      route: req.url,
    })
    const start = Date.now()

    const { statusCode, body } = await controller.execute(input)

    const output = statusCode >= 200 && statusCode <= 499 ? body : { error: body.message }

    const end = Date.now() - start

    loggerService.info('Finished request')

    res.status(statusCode).json({ info: { timestamp: new Date().toISOString(), execution_time_ms: end }, data: output })
  }
}
