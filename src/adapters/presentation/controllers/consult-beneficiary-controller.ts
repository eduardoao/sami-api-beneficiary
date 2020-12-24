import { iBeneficiaryController } from './iBeneficiaryController';
import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { IConsultBeneficiary } from '../../../usecases/consult-beneficiary/iconsult-beneficiary'
import { ConsultBeneficiaryResponse } from '../../../usecases/consult-beneficiary/consult-beneficiary-response';

export class ConsultBeneficiaryController implements iBeneficiaryController {
  private readonly ConsultBeneficiary: IConsultBeneficiary

  constructor (ConsultBeneficiary: IConsultBeneficiary) {
    this.ConsultBeneficiary = ConsultBeneficiary
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const consultBeneficiaryResponse: ConsultBeneficiaryResponse = await this.ConsultBeneficiary.ConsultBeneficiaryOnSystem()
      return ok(consultBeneficiaryResponse)
    } catch (error) {
      return serverError('internal')
    }
  }
}
