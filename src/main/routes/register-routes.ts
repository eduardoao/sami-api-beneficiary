import { Router } from 'express'
import { makeRegisterUserController } from '../factories/register'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/register', adaptRoute(makeRegisterUserController()))
}
