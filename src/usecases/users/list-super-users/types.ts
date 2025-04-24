import { UserCommonData } from '@/entities/users/types'

export interface ListSuperUsersUseCaseInterface {
  execute: () => Promise<UserCommonData[] | null>
}
