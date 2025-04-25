export type ListTopCountriesOutput = {
  country: string
  total: number
}

export interface ListTopCountriesUsecaseInterface {
  execute: () => Promise<ListTopCountriesOutput[] | null>
}
