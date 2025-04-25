export class InvalidParamError extends Error {
  constructor(param: string, message: string) {
    super(`Invalid param: ${param}. ${message}`)
    this.name = 'InvalidParamError'
  }
}

export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing param: ${param}`)
    this.name = 'MissingParamError'
  }
}

export class ServerError extends Error {
  constructor(error?: Error) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
