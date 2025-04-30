export type ListActiveUsersPerDayOutput = {
  logins: {
    date: string
    total: number
  }[]
}

export interface ListActiveUsersPerDayUsecaseInterface {
  execute: (minLogins?: number) => Promise<ListActiveUsersPerDayOutput | null>
}
