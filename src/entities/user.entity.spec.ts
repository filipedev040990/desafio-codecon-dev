import UserEntity from './user.entity'
import { UserCommonData } from './types'
import { InvalidParamError, MissingParamError } from '@/shared/errors'

describe('UserEntity', () => {
  let entity: any
  let input: any

  beforeEach(() => {
    entity = UserEntity
    input = {
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
    }
  })

  test('should throw if a required field is not provided', () => {
    const requirdFields: Array<keyof UserCommonData> = ['id', 'nome', 'idade', 'equipe', 'logs', 'score', 'pais']

    for (const field of requirdFields) {
      input[field] = undefined as any

      expect(() => {
        entity.build(input)
      }).toThrow(new MissingParamError(field))

      input[field] = field
    }
  })

  test('should throws if a invalid idade is provided', () => {
    input.idade = '25'
    expect(() => {
      entity.build(input)
    }).toThrow(new InvalidParamError('idade', 'O campo idade deve ser um inteiro'))
  })

  test('should throws if a invalid ativo is provided', () => {
    input.ativo = '25'
    expect(() => {
      entity.build(input)
    }).toThrow(new InvalidParamError('ativo', 'O campo ativo deve ser um booleano'))
  })

  test('should throws if a invalid score is provided', () => {
    input.score = '25'
    expect(() => {
      entity.build(input)
    }).toThrow(new InvalidParamError('score', 'O campo score deve ser um inteiro'))
  })

  test('should return a correct Entity', () => {
    const output = entity.build(input)
    expect(output).toEqual({
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
    })
  })
})
