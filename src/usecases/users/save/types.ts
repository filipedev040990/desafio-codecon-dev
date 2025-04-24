import { Equipe, Log } from '@/entities/users/types'

export type SaveUserUsecaseInput = {
  id: string
  nome: string
  idade: number
  score: number
  ativo: boolean
  pais: string
  equipe: Equipe
  logs: Log[]
}

export type SaveUserUsecaseOutput = {
  message: string
  user_count: number
}

export interface SaveUserUsecaseInterface {
  execute: (input: SaveUserUsecaseInput[]) => Promise<SaveUserUsecaseOutput>
}
