import { UserRepositoryInterface } from '@/infra/database/repositories/in-memory/types'
import ListTeamInsightsUsecase from './list-team-insights.usecase'
import { mockUsers } from '../list-top-countries/mock'
import { mock } from 'jest-mock-extended'

const params: any = {
  userRepository: mock<UserRepositoryInterface>(),
}
describe('ListTeamInsightsUsecase', () => {
  let usecase: ListTeamInsightsUsecase

  beforeEach(() => {
    usecase = new ListTeamInsightsUsecase(params)
    jest.spyOn(params.userRepository, 'listAll').mockResolvedValue(mockUsers)
  })

  test('should call UserRepository.listAll once', async () => {
    await usecase.execute()
    expect(params.userRepository.listAll).toHaveBeenCalledTimes(1)
  })

  test('should returns null if UserRepository.listAll returns null', async () => {
    jest.spyOn(params.userRepository, 'listAll').mockResolvedValueOnce(null)
    const output = await usecase.execute()
    expect(output).toBeNull()
  })

  test('should returns a correct output', async () => {
    const output = await usecase.execute()
    expect(output).toEqual([
      { active_percentage: 50, completed_projects: 10, leaders: 0, team: 'Equipe BR', total_members: 10 },
      { active_percentage: 50, completed_projects: 0, leaders: 0, team: 'Equipe AR', total_members: 6 },
      { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe CL', total_members: 5 },
      { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe MX', total_members: 4 },
      { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe PE', total_members: 3 },
      { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe CO', total_members: 2 },
      { active_percentage: 100, completed_projects: 0, leaders: 0, team: 'Equipe UY', total_members: 1 },
    ])
  })
})
