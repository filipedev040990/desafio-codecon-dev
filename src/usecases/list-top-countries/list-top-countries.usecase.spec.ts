import { UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import ListTopCountriesUseCase from './list-top-countries.usecase'
import { mockUsers } from './mock'
import { mock } from 'jest-mock-extended'

const params: any = {
  userRepository: mock<UserRepositoryInterface>(),
}

describe('ListTopCountriesUseCase', () => {
  let usecase: ListTopCountriesUseCase

  beforeEach(() => {
    usecase = new ListTopCountriesUseCase(params)
    jest.spyOn(params.userRepository, 'listSuperUsers').mockResolvedValue(mockUsers)
  })

  test('should call UserRepository.listSuperUsers once', async () => {
    await usecase.execute()
    expect(params.userRepository.listSuperUsers).toHaveBeenCalledTimes(1)
  })

  test('should returns null if UserRepository.listSuperUsers returns null', async () => {
    jest.spyOn(params.userRepository, 'listSuperUsers').mockResolvedValueOnce(null)
    const output = await usecase.execute()
    expect(output).toBeNull()
  })

  test('should return  a correct output', async () => {
    const output = await usecase.execute()
    expect(output).toEqual([
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
    ])
  })
})
