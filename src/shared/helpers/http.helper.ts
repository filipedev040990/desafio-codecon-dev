import { HttpResponse } from '@/controller/controller.interface'
import { container } from '@/infra/container/modules'

const loggerService = container.resolve('loggerService')

export const success = (statusCode: number, body: any): HttpResponse => ({
  statusCode,
  body,
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.name,
    message: error.message,
  },
})

export const serverError = (error: Error): HttpResponse => {
  const errorMessage = 'Internal server error'
  loggerService.error(errorMessage, { error: JSON.stringify(error.message) })
  return {
    statusCode: 500,
    body: {
      error: error.name,
      message: errorMessage,
    },
  }
}
