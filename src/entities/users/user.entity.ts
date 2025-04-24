import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { BuildUserEntityInput, Equipe, Log } from './types'

export default class UserEntity {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly idade: number,
    public readonly score: number,
    public readonly ativo: boolean,
    public readonly pais: string,
    public readonly equipe: Equipe,
    public readonly logs: Log[]
  ) {}

  public static build(input: BuildUserEntityInput): UserEntity {
    this.validateRequiredFields(input)
    this.validateFieldsTypes(input)
    return this.create(input)
  }

  private static validateRequiredFields(input: BuildUserEntityInput): void {
    const requirdFields: Array<keyof BuildUserEntityInput> = ['id', 'nome', 'idade', 'ativo', 'equipe', 'logs', 'score', 'pais']

    for (const field of requirdFields) {
      if (!input[field]) {
        throw new MissingParamError(field)
      }
    }
  }

  private static validateFieldsTypes(input: BuildUserEntityInput): void {
    if (typeof input.idade !== 'number') {
      throw new InvalidParamError('idade', 'O campo idade deve ser um inteiro')
    }

    if (typeof input.ativo !== 'boolean') {
      throw new InvalidParamError('ativo', 'O campo ativo deve ser um booleano')
    }

    if (typeof input.score !== 'number') {
      throw new InvalidParamError('score', 'O campo score deve ser um inteiro')
    }
  }

  private static create(input: BuildUserEntityInput): UserEntity {
    const { id, nome, idade, ativo, pais, score, equipe, logs } = input
    return new UserEntity(id, nome, idade, score, ativo, pais, equipe, logs)
  }
}
