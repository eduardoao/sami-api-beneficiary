import { Request, Response } from 'express'
import { HttpRequest } from '../../adapters/presentation/controllers/ports/http'
import { iBeneficiaryController } from '../../adapters/presentation/controllers/iBeneficiaryController'

export const adaptRoute = (controller: iBeneficiaryController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
