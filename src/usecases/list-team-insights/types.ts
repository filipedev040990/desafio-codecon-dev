export type Teams = {
  team: string
  total_members: number
  leaders: number
  completed_projects: number
  active_percentage: number
}

export type ListTeamInsightsOutput = {
  teams: Teams[]
}

export type TeamsMap = Teams & {
  total_actives?: number
}

export interface ListTeamInsightsUsecaseInterface {
  execute: () => Promise<ListTeamInsightsOutput[] | null>
}
