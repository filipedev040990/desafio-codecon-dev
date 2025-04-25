import { UserCommonData } from '@/entities/types'

export interface ListSuperUsersUseCaseInterface {
  execute: () => Promise<UserCommonData[] | null>
}
