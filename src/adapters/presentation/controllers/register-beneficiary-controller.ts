import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { IRegisterBeneficiary } from '../../../usecases/register-beneficiary/iregister-beneficiary'
import { RegisterBeneficiaryResponse } from '../../../usecases/register-beneficiary/register-beneficiary-response'

export class RegisterBeneficiaryController {
  private readonly RegisterBeneficiary: IRegisterBeneficiary 

  constructor (RegisterBeneficiary: IRegisterBeneficiary ) {
    this.RegisterBeneficiary = RegisterBeneficiary    
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.name || !httpRequest.body.email) {
        const field = !httpRequest.body.name ? 'name' : 'email'
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
      const RegisterBeneficiaryResponse: RegisterBeneficiaryResponse = await this.RegisterBeneficiary.RegisterBeneficiaryOnSystem(beneficiaryData)
      if (RegisterBeneficiaryResponse.isLeft()) {
        return badRequest(RegisterBeneficiaryResponse.value)
      }    
      return ok(beneficiaryData)
    } catch (error) {
      return serverError('internal')
    }
  }
}
