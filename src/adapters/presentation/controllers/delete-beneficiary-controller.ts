import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DeleteBeneficiaryResponse } from '../../../usecases/delete-beneficiary/delete-beneficiary-response'
import { IDeleteBeneficiary } from '../../../usecases/delete-beneficiary/idelete-beneficiary'
import { iBeneficiaryController } from './iBeneficiaryController'

export class DeleteBeneficiaryController implements iBeneficiaryController {
  private readonly DeleteBeneficiary: IDeleteBeneficiary

  constructor (DeleteBeneficiary: IDeleteBeneficiary) {
    this.DeleteBeneficiary = DeleteBeneficiary
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.email) {
        const field = !httpRequest.body.email ? 'email' : 'email'
        return badRequest(new MissingParamError(field))
      }
      const beneficiaryData = {
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        plantype: httpRequest.body.plantype,
        RG: httpRequest.body.RG,
        CPF: httpRequest.body.CPF,
        birthDate: httpRequest.body.birthDate,
        dependent: httpRequest.body.dependent
      }
      const DeleteBeneficiaryResponse: DeleteBeneficiaryResponse = await this.DeleteBeneficiary.DeleteBeneficiaryOnSystem(beneficiaryData)
      if (DeleteBeneficiaryResponse.isLeft()) {
        return badRequest(DeleteBeneficiaryResponse.value)
      }
      return ok('OK')
    } catch (error) {
      return serverError('internal')
    }
  }
}
