export type ListActiveUsersPerDayOutput = {
  date: string
  total: number
}

export interface ListActiveUsersPerDayUsecaseInterface {
  execute: (minLogins?: number) => Promise<ListActiveUsersPerDayOutput[] | null>
}
