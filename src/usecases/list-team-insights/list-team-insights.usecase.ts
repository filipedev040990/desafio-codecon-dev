import { AppContainer } from '@/infra/container/modules'
import { ListTeamInsightsOutput, ListTeamInsightsUsecaseInterface, Teams, TeamsMap } from './types'
import { UserRepositoryData, UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'

export default class ListTeamInsightsUsecase implements ListTeamInsightsUsecaseInterface {
  private readonly userRepository: UserRepositoryInterface

  constructor(params: AppContainer) {
    this.userRepository = params.userRepository
  }

  async execute(): Promise<ListTeamInsightsOutput[] | null> {
    const users = await this.userRepository.listAll()

    if (!users) {
      return null
    }

    return this.getTeamInsights(users)
  }

  getTeamInsights(users: UserRepositoryData[]): any {
    const teamsMap: Record<string, TeamsMap> = {}

    for (const user of users) {
      const team = JSON.parse(user.equipe)
      const teamName = team.nome
      const completedProjects = team.projetos.filter((p: any) => p.concluido).length

      if (!teamsMap[teamName]) {
        teamsMap[teamName] = {
          team: teamName,
          total_members: 1,
          leaders: team.lider ? 1 : 0,
          completed_projects: completedProjects,
          active_percentage: 0,
          total_actives: user.ativo ? 1 : 0,
        }
      } else {
        teamsMap[teamName].team = teamName
        teamsMap[teamName].total_members += 1
        teamsMap[teamName].leaders += team.lider ? 1 : 0
        teamsMap[teamName].completed_projects += completedProjects
        teamsMap[teamName].total_actives! += user.ativo ? 1 : 0
      }
    }

    for (const team in teamsMap) {
      const total = teamsMap[team].total_members
      const actives = teamsMap[team].total_actives!
      teamsMap[team].active_percentage = Math.round((actives / total) * 100)
    }

    const output = Object.entries(teamsMap).map(([, teams]) => {
      delete teams.total_actives
      return teams
    })

    return output
  }
}
