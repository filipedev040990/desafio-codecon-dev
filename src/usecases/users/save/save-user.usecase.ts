import UserEntity from '@/entities/users/user.entity'
import { SaveUserUsecaseInterface, SaveUserUsecaseOutput } from './types'
import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import { AppContainer } from '@/infra/container/modules'
import { UserCommonData } from '@/entities/users/types'

export default class SaveUserUsecase implements SaveUserUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface

  constructor(params: AppContainer) {
    this.userRepository = params.userRepository
  }

  async execute(input: UserCommonData[]): Promise<SaveUserUsecaseOutput> {
    for await (const data of input) {
      const user = UserEntity.build(data)
      this.userRepository.save(this.makeRepositoryInput(user))
    }

    return { message: 'Arquivo recebido com sucesso', user_count: input.length }
  }

  makeRepositoryInput(input: UserCommonData): UserRepositoryData {
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
