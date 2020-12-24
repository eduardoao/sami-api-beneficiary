import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateBeneficiaryController } from '../factories/update'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.put('/update', adaptRoute(makeUpdateBeneficiaryController()))
}
