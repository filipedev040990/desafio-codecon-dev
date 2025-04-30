import EvaluationUsecase from './evaluation.usecase'
import { HttpServiceInterface } from '@/shared/services/http/http.service.interface'
import { mock } from 'jest-mock-extended'

const params: any = {
  httpService: mock<HttpServiceInterface>(),
}

describe('EvaluationUsecase', () => {
  let usecase: EvaluationUsecase

  beforeEach(() => {
    usecase = new EvaluationUsecase(params)
    jest
      .spyOn(params.httpService, 'get')
      .mockResolvedValueOnce({ status: 200, data: { valid_response: true }, timeMs: 1000 })
      .mockResolvedValueOnce({ status: 200, data: { valid_response: true }, timeMs: 900 })
      .mockResolvedValueOnce({ status: 200, data: { valid_response: true }, timeMs: 1200 })
      .mockResolvedValueOnce({ status: 200, data: { valid_response: true }, timeMs: 1100 })
  })

  test('should call HttpService correctly for each endpoint', async () => {
    const endpointsToTest = ['http://localhost:3000/superusers', 'http://localhost:3000/top-countries', 'http://localhost:3000/team-insights', 'http://localhost:3000/active-users-per-day']

    await usecase.execute()

    for (const endpoint of endpointsToTest) {
      expect(params.httpService.get).toHaveBeenCalledWith(endpoint)
    }

    expect(params.httpService.get).toHaveBeenCalledTimes(4)
  })

  test('should return a correct output', async () => {
    const output = await usecase.execute()
    expect(output).toEqual({
      tested_endpoints: {
        '/superusers': { status: 200, time_ms: 1000, valid_response: true },
        '/top-countries': { status: 200, time_ms: 900, valid_response: true },
        '/team-insights': { status: 200, time_ms: 1200, valid_response: true },
        '/active-users-per-day': { status: 200, time_ms: 1100, valid_response: true },
      },
    })
  })
})
