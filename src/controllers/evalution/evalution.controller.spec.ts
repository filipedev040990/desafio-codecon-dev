import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import EvalutionController from './evalution.controller'
import { EvaluationUsecaseInterface, EvaluationUsecaseOutput } from '@/usecases/evaluation/types'
import { mock } from 'jest-mock-extended'

const params: any = {
  evalutionUsecase: mock<EvaluationUsecaseInterface>(),
  loggerService: mock<LoggerServiceInterface>(),
}

const usecaseOutput: EvaluationUsecaseOutput = {
  tested_endpoints: {
    '/superusers': { status: 200, time_ms: 1000, valid_response: true },
    '/top-countries': { status: 200, time_ms: 900, valid_response: true },
    '/team-insights': { status: 200, time_ms: 1200, valid_response: true },
    '/active-users-per-day': { status: 200, time_ms: 1100, valid_response: true },
  },
}

describe('EvalutionController', () => {
  let controller: EvalutionController

  beforeEach(() => {
    controller = new EvalutionController(params)
    jest.spyOn(params.evalutionUsecase, 'execute').mockResolvedValue(usecaseOutput)
  })

  test('should call ListSuperUsersUseCase.execute once', async () => {
    await controller.execute()
    expect(params.evalutionUsecase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await controller.execute()
    expect(output).toEqual({ statusCode: 200, body: usecaseOutput })
  })
})
