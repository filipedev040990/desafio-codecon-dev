import { expressRouteAdapter } from './express-route-adapter'
import { container } from '../container/modules'
import { requestIdMiddleware } from '../middlewares/request-id.middleware'
import { Router } from 'express'

const router = Router()

router.use(requestIdMiddleware)

router.post('/users', expressRouteAdapter(container.resolve('saveUserController')))

export { router }
