import ListSuperUsersController from './list-super-users.controller'
import { ListSuperUsersUseCaseInterface, ListSuperUsersUseCaseOutput } from '@/usecases/users/list-super-users/types'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import { mock } from 'jest-mock-extended'

const params: any = {
  listSuperUsersUsecase: mock<ListSuperUsersUseCaseInterface>(),
  loggerService: mock<LoggerServiceInterface>(),
}

const usecaseOutput: ListSuperUsersUseCaseOutput[] = [
  {
    id: '123456',
    nome: 'Zé das Couves',
    ativo: true,
    score: 1000,
    idade: 25,
    pais: 'Brasil',
    equipe: {
      nome: 'Equipe ABC',
      lider: false,
      projetos: [
        {
          nome: 'Pix',
          concluido: true,
        },
      ],
    },
    logs: [
      {
        data: '2025-03-25',
        acao: 'login',
      },
      {
        data: '2025-03-25',
        acao: 'logout',
      },
    ],
  },
  {
    id: '789456123132132',
    nome: 'João da Silva',
    ativo: true,
    score: 1500,
    idade: 45,
    pais: 'Brasil',
    equipe: {
      nome: 'Equipe XPTO',
      lider: false,
      projetos: [
        {
          nome: 'Pix',
          concluido: true,
        },
      ],
    },
    logs: [
      {
        data: '2025-03-25',
        acao: 'login',
      },
      {
        data: '2025-03-25',
        acao: 'logout',
      },
    ],
  },
]

describe('ListSuperUsersController', () => {
  let controller: ListSuperUsersController

  beforeEach(() => {
    controller = new ListSuperUsersController(params)
    jest.spyOn(params.listSuperUsersUsecase, 'execute').mockResolvedValue(usecaseOutput)
  })

  test('should call ListSuperUsersUseCase.execute once', async () => {
    await controller.execute()
    expect(params.listSuperUsersUsecase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await controller.execute()
    expect(output).toEqual({ statusCode: 200, body: usecaseOutput })
  })
})
