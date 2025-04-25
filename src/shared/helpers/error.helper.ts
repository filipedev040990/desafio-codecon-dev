import { HttpResponse } from '@/controllers/types'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from './http.helper'

export const handleError = (error: any): HttpResponse => {
  if (error instanceof InvalidParamError || error instanceof MissingParamError) {
    return badRequest(error)
  }

  return serverError(error)
}
