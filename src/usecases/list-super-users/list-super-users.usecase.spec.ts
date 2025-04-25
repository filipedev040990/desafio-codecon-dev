import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import ListSuperUsersUsecase from './list-super-users.usecase'
import { mock } from 'jest-mock-extended'

const params: any = {
  userRepository: mock<UserRepositoryInterface>(),
}

const repositoryOutput: UserRepositoryData[] = [
  {
    id: '123456',
    nome: 'Zé das Couves',
    ativo: true,
    score: 1000,
    idade: 25,
    pais: 'Brasil',
    equipe: JSON.stringify({
      nome: 'Equipe ABC',
      lider: false,
      projetos: [
        {
          nome: 'Pix',
          concluido: true,
        },
      ],
    }),
    logs: JSON.stringify([
      {
        data: '2025-03-25',
        acao: 'login',
      },
      {
        data: '2025-03-25',
        acao: 'logout',
      },
    ]),
  },
  {
    id: '789456123132132',
    nome: 'João da Silva',
    ativo: true,
    score: 1500,
    idade: 45,
    pais: 'Brasil',
    equipe: JSON.stringify({
      nome: 'Equipe XPTO',
      lider: false,
      projetos: [
        {
          nome: 'Pix',
          concluido: true,
        },
      ],
    }),
    logs: JSON.stringify([
      {
        data: '2025-03-25',
        acao: 'login',
      },
      {
        data: '2025-03-25',
        acao: 'logout',
      },
    ]),
  },
]

describe('ListSuperUsersUsecase', () => {
  let usecase: ListSuperUsersUsecase

  beforeEach(() => {
    usecase = new ListSuperUsersUsecase(params)
    jest.spyOn(params.userRepository, 'listSuperUsers').mockResolvedValue(repositoryOutput)
  })

  test('should call UserRepository.listSuperUsers once', async () => {
    await usecase.execute()
    expect(params.userRepository.listSuperUsers).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await usecase.execute()
    expect(output).toEqual([
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
    ])
  })

  test('should return null', async () => {
    jest.spyOn(params.userRepository, 'listSuperUsers').mockResolvedValueOnce(null)
    const output = await usecase.execute()
    expect(output).toBe(null)
  })
})
