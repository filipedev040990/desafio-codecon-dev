export type UserRepositoryData = {
  id: string
  nome: string
  idade: number
  score: number
  ativo: boolean
  pais: string
  equipe: string
  logs: string
}

export interface UserRepositoryInterface {
  save: (input: UserRepositoryData) => Promise<void>
  listSuperUsers: () => Promise<UserRepositoryData[] | null>
}
