import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeConsultBeneficiaryController } from '../factories/consult'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/consult', adaptRoute(makeConsultBeneficiaryController()))
}
