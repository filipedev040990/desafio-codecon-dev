import { ListSuperUsersUseCaseInterface } from '@/usecases/users/list-super-users/types'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import ListTopCountriesController from './list-top-countries.controller'
import { ListTopCountriesOutput } from '@/usecases/users/list-top-countries/types'
import { mock } from 'jest-mock-extended'

const params: any = {
  listTopCountriesUsecase: mock<ListSuperUsersUseCaseInterface>(),
  loggerService: mock<LoggerServiceInterface>(),
}

const usecaseOutput: ListTopCountriesOutput[] = [
  {
    country: 'Brasil',
    total: 10,
  },
  {
    country: 'Argentina',
    total: 6,
  },
  {
    country: 'Chile',
    total: 5,
  },
  {
    country: 'México',
    total: 4,
  },
  {
    country: 'Peru',
    total: 3,
  },
]

describe('ListTopCountriesController', () => {
  let controller: ListTopCountriesController

  beforeEach(() => {
    controller = new ListTopCountriesController(params)
    jest.spyOn(params.listTopCountriesUsecase, 'execute').mockResolvedValue(usecaseOutput)
  })

  test('should call ListSuperUsersUseCase.execute once', async () => {
    await controller.execute()
    expect(params.listTopCountriesUsecase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await controller.execute()
    expect(output).toEqual({ statusCode: 200, body: usecaseOutput })
  })
})
