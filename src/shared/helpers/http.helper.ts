import { HttpResponse } from '@/controllers/types'
import LoggerService from '../services/logger/logger.service'

const loggerService = new LoggerService()

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
