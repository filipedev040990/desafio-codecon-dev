import { HttpRequest } from '@/controllers/types'
import SaveUserController from './save-user.controller'
import { mock } from 'jest-mock-extended'
import { SaveUserUsecaseInterface } from '@/usecases/save-user/types'
import { LoggerServiceInterface } from '@/shared/services/logger/logger.service.interface'

const params: any = {
  saveUserUsecase: mock<SaveUserUsecaseInterface>(),
  loggerService: mock<LoggerServiceInterface>(),
}

const usecaseOutput = { message: 'Arquivo recebido com sucesso', user_count: 100000 }

describe('SaveUserController', () => {
  let controller: SaveUserController
  let input: HttpRequest

  beforeEach(() => {
    controller = new SaveUserController(params)
    input = {
      body: [
        {
          id: '225bd8bc-6d6c-498d-ba65-054895718325',
          nome: 'Zé das Couves',
          idade: 25,
          ativo: true,
          score: 123,
          pais: 'Brasil',
          equipe: {
            nome: 'Equipe ABC',
            lider: false,
            projetos: [
              {
                nome: 'Pix',
                concluido: true,
              },
            ],
          },
          logs: [
            {
              data: '2025-03-25',
              acao: 'login',
            },
            {
              data: '2025-03-25',
              acao: 'logout',
            },
          ],
        },
      ],
    }

    jest.spyOn(params.saveUserUsecase, 'execute').mockResolvedValue(usecaseOutput)
  })

  test('should call usecase once and with correct values', async () => {
    await controller.execute(input)
    expect(params.saveUserUsecase.execute).toHaveBeenCalledTimes(1)
    expect(params.saveUserUsecase.execute).toHaveBeenCalledWith(input.body)
  })

  test('should return a correct output', async () => {
    const output = await controller.execute(input)
    expect(output).toEqual({ statusCode: 201, body: usecaseOutput })
  })
})
