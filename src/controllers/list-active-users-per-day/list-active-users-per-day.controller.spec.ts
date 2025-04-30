import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import ListActiveUsersPerDayController from './list-active-users-per-day.controller'
import { ListActiveUsersPerDayOutput, ListActiveUsersPerDayUsecaseInterface } from '@/usecases/list-active-users-per-day/types'
import { mock } from 'jest-mock-extended'
import { HttpRequest } from '../types'

const params: any = {
  listActiveUsersPerDayUsecase: mock<ListActiveUsersPerDayUsecaseInterface>(),
  loggerService: mock<LoggerServiceInterface>(),
}

const usecaseOutput: ListActiveUsersPerDayOutput[] = [
  { date: '2025-04-01', total: 2 },
  { date: '2025-04-02', total: 5 },
  { date: '2025-04-03', total: 2 },
  { date: '2025-04-05', total: 10 },
  { date: '2025-04-07', total: 50 },
]

describe('ListActiveUsersPerDayController', () => {
  let controller: ListActiveUsersPerDayController
  let input: HttpRequest

  beforeEach(() => {
    controller = new ListActiveUsersPerDayController(params)
    input = {
      params: {
        minLogin: 2,
      },
    }
    jest.spyOn(params.listActiveUsersPerDayUsecase, 'execute').mockResolvedValue(usecaseOutput)
  })

  test('should call ListTeamInsightsUseCase.execute once and with correct values', async () => {
    await controller.execute(input)
    expect(params.listActiveUsersPerDayUsecase.execute).toHaveBeenCalledTimes(1)
    expect(params.listActiveUsersPerDayUsecase.execute).toHaveBeenCalledWith(2)
  })

  test('should return a correct output', async () => {
    const output = await controller.execute(input)
    expect(output).toEqual({ statusCode: 200, body: usecaseOutput })
  })
})
