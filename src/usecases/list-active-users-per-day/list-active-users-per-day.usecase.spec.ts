import ListActiveUsersPerDayUsecase from './list-active-users-per-day.usecase'
import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import { mock, stub } from 'jest-mock-extended'

const params: any = {
  userRepository: mock<UserRepositoryInterface>(),
}

const repositoryOutput: UserRepositoryData[] = [
  {
    id: '1',
    nome: 'João Silva',
    idade: 30,
    score: 1200,
    ativo: true,
    pais: 'Brasil',
    equipe: JSON.stringify({
      nome: 'Equipe Alpha',
      lider: false,
      projetos: [
        { nome: 'Projeto X', concluido: true },
        { nome: 'Projeto Y', concluido: false },
      ],
    }),
    logs: JSON.stringify([
      { data: '2025-04-01', acao: 'login' },
      { data: '2025-04-02', acao: 'logout' },
    ]),
  },
  {
    id: '2',
    nome: 'Maria Oliveira',
    idade: 25,
    score: 980,
    ativo: true,
    pais: 'Argentina',
    equipe: JSON.stringify({
      nome: 'Equipe Beta',
      lider: true,
      projetos: [{ nome: 'Projeto A', concluido: true }],
    }),
    logs: JSON.stringify([{ data: '2025-04-03', acao: 'login' }]),
  },
  {
    id: '3',
    nome: 'Carlos Dias',
    idade: 40,
    score: 1500,
    ativo: false,
    pais: 'Chile',
    equipe: JSON.stringify({
      nome: 'Equipe Alpha',
      lider: true,
      projetos: [{ nome: 'Projeto X', concluido: true }],
    }),
    logs: JSON.stringify([{ data: '2025-04-02', acao: 'logout' }]),
  },
  {
    id: '4',
    nome: 'Fernanda Lima',
    idade: 35,
    score: 1100,
    ativo: true,
    pais: 'Brasil',
    equipe: JSON.stringify({
      nome: 'Equipe Beta',
      lider: false,
      projetos: [{ nome: 'Projeto B', concluido: false }],
    }),
    logs: JSON.stringify([
      { data: '2025-04-05', acao: 'login' },
      { data: '2025-04-06', acao: 'logout' },
    ]),
  },
  {
    id: '5',
    nome: 'Pedro Martins',
    idade: 29,
    score: 875,
    ativo: false,
    pais: 'Peru',
    equipe: JSON.stringify({
      nome: 'Equipe Gamma',
      lider: false,
      projetos: [{ nome: 'Projeto C', concluido: true }],
    }),
    logs: JSON.stringify([{ data: '2025-04-02', acao: 'login' }]),
  },
  {
    id: '6',
    nome: 'Ana Souza',
    idade: 42,
    score: 1340,
    ativo: true,
    pais: 'México',
    equipe: JSON.stringify({
      nome: 'Equipe Delta',
      lider: true,
      projetos: [
        { nome: 'Projeto D', concluido: true },
        { nome: 'Projeto E', concluido: true },
      ],
    }),
    logs: JSON.stringify([{ data: '2025-04-04', acao: 'logout' }]),
  },
  {
    id: '7',
    nome: 'Lucas Rocha',
    idade: 31,
    score: 1020,
    ativo: true,
    pais: 'Brasil',
    equipe: JSON.stringify({
      nome: 'Equipe Gamma',
      lider: false,
      projetos: [{ nome: 'Projeto F', concluido: false }],
    }),
    logs: JSON.stringify([{ data: '2025-04-03', acao: 'login' }]),
  },
  {
    id: '8',
    nome: 'Juliana Nunes',
    idade: 27,
    score: 920,
    ativo: true,
    pais: 'Argentina',
    equipe: JSON.stringify({
      nome: 'Equipe Alpha',
      lider: false,
      projetos: [{ nome: 'Projeto X', concluido: true }],
    }),
    logs: JSON.stringify([{ data: '2025-04-01', acao: 'login' }]),
  },
  {
    id: '9',
    nome: 'Diego Costa',
    idade: 38,
    score: 1430,
    ativo: false,
    pais: 'Chile',
    equipe: JSON.stringify({
      nome: 'Equipe Beta',
      lider: true,
      projetos: [
        { nome: 'Projeto B', concluido: false },
        { nome: 'Projeto G', concluido: true },
      ],
    }),
    logs: JSON.stringify([{ data: '2025-04-06', acao: 'logout' }]),
  },
  {
    id: '10',
    nome: 'Camila Ferreira',
    idade: 33,
    score: 990,
    ativo: true,
    pais: 'Brasil',
    equipe: JSON.stringify({
      nome: 'Equipe Delta',
      lider: false,
      projetos: [{ nome: 'Projeto H', concluido: true }],
    }),
    logs: JSON.stringify([{ data: '2025-04-07', acao: 'login' }]),
  },
]

describe('ListActiveUsersPerDayUsecase', () => {
  let usecase: ListActiveUsersPerDayUsecase
  let minLogins: number = 0

  beforeEach(() => {
    usecase = new ListActiveUsersPerDayUsecase(params)
    jest.spyOn(params.userRepository, 'listAll').mockResolvedValue(repositoryOutput)
  })

  test('should call UserRepository once', async () => {
    await usecase.execute(minLogins)
    expect(params.userRepository.listAll).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output when minLogins is provided', async () => {
    minLogins = 2
    const output = await usecase.execute(minLogins)
    expect(output).toEqual({
      logins: [
        { date: '2025-04-01', total: 2 },
        { date: '2025-04-03', total: 2 },
      ],
    })

    minLogins = 3
    const output2 = await usecase.execute(minLogins)
    expect(output2).toEqual({ logins: [] })
  })

  test('should return a correct output when minLogins is note provided', async () => {
    minLogins = undefined as any
    const output = await usecase.execute(minLogins)
    expect(output).toEqual({
      logins: [
        { date: '2025-04-01', total: 2 },
        { date: '2025-04-02', total: 1 },
        { date: '2025-04-03', total: 2 },
        { date: '2025-04-05', total: 1 },
        { date: '2025-04-07', total: 1 },
      ],
    })
  })
})
