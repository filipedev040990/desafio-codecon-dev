import UserEntity from '@/entities/users/user.entity'
import SaveUserUsecase from './save-user.usecase'
import { SaveUserUsecaseInput } from './types'
import { mock, stub } from 'jest-mock-extended'
import { UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'

const params: any = {
  userRepository: mock<UserRepositoryInterface>(),
}

describe('SaveUserUsecase', () => {
  let usecase: SaveUserUsecase
  let input: SaveUserUsecaseInput[]

  beforeEach(() => {
    usecase = new SaveUserUsecase(params)
    input = [
      {
        id: '225bd8bc-6d6c-498d-ba65-054895718325',
        nome: 'Zé das Couves',
        idade: 25,
        ativo: true,
        score: 123,
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
    ]
  })

  test('should build a correct entity', async () => {
    const spy = jest.spyOn(UserEntity, 'build')
    await usecase.execute(input)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(input[0])
  })

  test('should call UserRepository.save once and with correct values', async () => {
    await usecase.execute(input)
    expect(params.userRepository.save).toHaveBeenCalledTimes(1)
    expect(params.userRepository.save).toHaveBeenCalledWith({
      id: '225bd8bc-6d6c-498d-ba65-054895718325',
      nome: 'Zé das Couves',
      idade: 25,
      ativo: true,
      score: 123,
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
    })
  })

  test('should return a correct output', async () => {
    const output = await usecase.execute(input)
    expect(output).toEqual({ message: 'Arquivo recebido com sucesso', user_count: 1 })
  })
})
