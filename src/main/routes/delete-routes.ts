import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeDeleteBeneficiaryController } from '../factories/delete'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.delete('/delete', adaptRoute(makeDeleteBeneficiaryController()))
}
