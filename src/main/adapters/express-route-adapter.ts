import { RegisterBeneficiaryController } from '../../adapters/presentation/controllers/register-beneficiary-controller'
import { Request, Response } from 'express'
import { HttpRequest } from '../../adapters/presentation/controllers/ports/http'

export const adaptRoute = (controller: RegisterBeneficiaryController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
