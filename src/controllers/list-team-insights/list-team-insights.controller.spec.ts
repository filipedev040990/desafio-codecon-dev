import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'
import ListTeamInsightsController from './list-team-insights.controller'
import { ListTeamInsightsOutput, ListTeamInsightsUsecaseInterface } from '@/usecases/list-team-insights/types'
import { mock } from 'jest-mock-extended'

const params: any = {
  listTeamInsightsUsecase: mock<ListTeamInsightsUsecaseInterface>(),
  loggerService: mock<LoggerServiceInterface>(),
}

const usecaseOutput: any = [
  { active_percentage: 50, completed_projects: 10, leaders: 0, team: 'Equipe BR', total_members: 10 },
  { active_percentage: 50, completed_projects: 0, leaders: 0, team: 'Equipe AR', total_members: 6 },
  { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe CL', total_members: 5 },
  { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe MX', total_members: 4 },
  { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe PE', total_members: 3 },
  { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe CO', total_members: 2 },
  { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe UY', total_members: 1 },
]

describe('ListTeamInsightsController', () => {
  let controller: ListTeamInsightsController

  beforeEach(() => {
    controller = new ListTeamInsightsController(params)
    jest.spyOn(params.listTeamInsightsUsecase, 'execute').mockResolvedValue(usecaseOutput)
  })

  test('should call ListTeamInsightsUseCase.execute once', async () => {
    await controller.execute()
    expect(params.listTeamInsightsUsecase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await controller.execute()
    expect(output).toEqual({ statusCode: 200, body: usecaseOutput })
  })
})
