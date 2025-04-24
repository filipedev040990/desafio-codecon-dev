import { ControllerInterface, HttpRequest } from '@/controller/controller.interface'
import { container } from '../container/modules'
import { Request, Response } from 'express'

const loggerService = container.resolve('loggerService')

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req?.body,
    }

    const start = Date.now()

    loggerService.info('Started request', {
      method: req.method,
      route: req.url,
      input: JSON.stringify(input.body),
    })

    const { statusCode, body } = await controller.execute(input)

    const output = statusCode >= 200 && statusCode <= 499 ? body : { error: body.message }

    const end = Date.now() - start

    Object.assign(output, { timestamp: new Date().toISOString(), execution_time_ms: end })

    loggerService.info('Finished request', {
      output: JSON.stringify(output),
    })

    res.status(statusCode).json(output)
  }
}
