import { Equipe, Log } from '@/entities/users/types'

export type ListSuperUsersUseCaseOutput = {
  id: string
  nome: string
  idade: number
  score: number
  ativo: boolean
  pais: string
  equipe: Equipe
  logs: Log[]
}

export interface ListSuperUsersUseCaseInterface {
  execute: () => Promise<ListSuperUsersUseCaseOutput[] | null>
}
