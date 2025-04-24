import { InvalidParamError } from '@/shared/errors'
import LoggerService from '@/shared/services/logger/logger.service'
import { SaveUserUsecaseInput } from '@/usecases/users/save/types'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'

const logger = new LoggerService()

export const uploadUsersByJsonFile = async (req: Request, res: Response, next: NextFunction) => {
  const filePath = req.file?.path

  if (!filePath) {
    logger.error('File not found')
    throw new InvalidParamError('file', 'Forneça um arquivo com dados de usuarios')
  }

  fs.readFile(filePath, 'utf-8', (err: any, data: any) => {
    if (err) {
      logger.error('Error read file')
      throw err
    }

    data = JSON.parse(data)

    const body: SaveUserUsecaseInput[] = data.map((usuario: SaveUserUsecaseInput) => {
      return {
        id: usuario.id,
        nome: usuario.nome,
        idade: usuario.idade,
        score: usuario.score,
        ativo: usuario.ativo,
        pais: usuario.pais,
        equipe: usuario.equipe,
        logs: usuario.logs,
      }
    })

    req.body = body

    fs.unlinkSync(filePath)
    next()
  })
}
