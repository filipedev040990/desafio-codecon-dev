import { expressRouteAdapter } from './express-route-adapter'
import { container } from '../container/modules'
import { requestIdMiddleware } from '../middlewares/request-id.middleware'
import { Router } from 'express'
import multer from 'multer'
import { uploadUsersByJsonFile } from '../middlewares/upload-users-by-json'

const router = Router()

const upload = multer({ dest: 'uploads/' })

router.use(requestIdMiddleware)

router.post('/users', upload.single('users'), uploadUsersByJsonFile, expressRouteAdapter(container.resolve('saveUserController')))
router.get('/superusers', expressRouteAdapter(container.resolve('listSuperUsersController')))
router.get('/top-countries', expressRouteAdapter(container.resolve('listTopCountriesController')))
router.get('/team-insights', expressRouteAdapter(container.resolve('listTeamInsightsController')))
router.get('/active-users-per-day', expressRouteAdapter(container.resolve('listActiveUsersPerDayController')))

export { router }
