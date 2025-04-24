import UserEntity from '@/entities/users/user.entity'
import { SaveUserUsecaseInput, SaveUserUsecaseInterface, SaveUserUsecaseOutput } from './types'
import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import { AppContainer } from '@/infra/container/modules'

export default class SaveUserUsecase implements SaveUserUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface

  constructor(params: AppContainer) {
    this.userRepository = params.userRepository
  }

  async execute(input: SaveUserUsecaseInput[]): Promise<SaveUserUsecaseOutput> {
    for await (const data of input) {
      const user = UserEntity.build(data)
      this.userRepository.save(this.makeRepositoryInput(user))
    }

    return { message: 'Arquivo recebido com sucesso', user_count: input.length }
  }

  makeRepositoryInput(input: SaveUserUsecaseInput): UserRepositoryData {
    return {
      id: input.id,
      nome: input.nome,
      ativo: input.ativo,
      score: input.score,
      idade: input.idade,
      pais: input.pais,
      equipe: JSON.stringify(input.equipe),
      logs: JSON.stringify(input.logs),
    }
  }
}
