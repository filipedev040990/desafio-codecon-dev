import { UserCommonData } from '@/entities/types'

export type SaveUserUsecaseOutput = {
  message: string
  user_count: number
}

export interface SaveUserUsecaseInterface {
  execute: (input: UserCommonData[]) => Promise<SaveUserUsecaseOutput>
}
