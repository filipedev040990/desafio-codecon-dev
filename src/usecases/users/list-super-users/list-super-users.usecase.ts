import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import { ListSuperUsersUseCaseInterface, ListSuperUsersUseCaseOutput } from './types'
import { AppContainer } from '@/infra/container/modules'

export default class ListSuperUsersUsecase implements ListSuperUsersUseCaseInterface {
  private readonly userRepository: UserRepositoryInterface

  constructor(params: AppContainer) {
    this.userRepository = params.userRepository
  }

  async execute(): Promise<ListSuperUsersUseCaseOutput[] | null> {
    const superUsers = await this.userRepository.listSuperUsers()

    if (!superUsers?.length) {
      return null
    }

    const output: ListSuperUsersUseCaseOutput[] = superUsers.map((superUser: UserRepositoryData) => {
      return {
        id: superUser.id,
        nome: superUser.nome,
        ativo: superUser.ativo,
        idade: superUser.idade,
        pais: superUser.pais,
        score: superUser.score,
        equipe: JSON.parse(superUser.equipe),
        logs: JSON.parse(superUser.logs),
      }
    })

    return output
  }
}
