import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { UpdateBeneficiaryResponse } from '../../../usecases/update-beneficiary/update-beneficiary-response'
import { IUpdateBeneficiary } from '../../../usecases/update-beneficiary/iupdate-beneficiary'
import { iBeneficiaryController } from './iBeneficiaryController'

export class UpdateBeneficiaryController implements iBeneficiaryController {
  private readonly UpdateBeneficiary: IUpdateBeneficiary

  constructor (UpdateBeneficiary: IUpdateBeneficiary) {
    this.UpdateBeneficiary = UpdateBeneficiary
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.name || !httpRequest.body.email) {
        const field = !httpRequest.body.name ? 'name' : 'email'
        return badRequest(new MissingParamError(field))
      }
      const beneficiaryData = {
        id: httpRequest.body.id,
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        plantype: httpRequest.body.plantype,
        RG: httpRequest.body.RG,
        CPF: httpRequest.body.CPF,
        birthDate: httpRequest.body.birthDate,
        dependent: httpRequest.body.dependent

      }
      const updateBeneficiaryResponse: UpdateBeneficiaryResponse = await this.UpdateBeneficiary.UpdateBeneficiaryOnSystem(beneficiaryData)
      if (updateBeneficiaryResponse.isLeft()) {
        return badRequest(updateBeneficiaryResponse.value)
      }
      return ok(beneficiaryData)
    } catch (error) {
      return serverError('internal')
    }
  }
}
