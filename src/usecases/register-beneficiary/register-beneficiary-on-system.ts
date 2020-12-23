import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'
import { BeneficiaryRepository } from '../ports/beneficiary-repository'
import { left, right, Either } from '../../shared/either'
import { IRegisterBeneficiary } from './iregister-beneficiary'
import { RegisterBeneficiaryResponse } from './register-beneficiary-response'
import { Beneficiary } from '../../entities/beneficiary/beneficiary'
import { InvalidNameError } from '../../entities/beneficiary/errors/invalid-name'
import { InvalidEmailError } from '../../entities/beneficiary/errors/invalid-email'

export class RegisterBeneficiaryOnSystem implements IRegisterBeneficiary {
  private readonly userRepository: BeneficiaryRepository

  constructor (beneficiaryRepo: BeneficiaryRepository) {
    this.userRepository = beneficiaryRepo
  }

  async RegisterBeneficiaryOnSystem (beneficiaryData: BeneficiaryData): Promise<RegisterBeneficiaryResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, Beneficiary> = Beneficiary.create(beneficiaryData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const beneficiary: Beneficiary = userOrError.value
    const exists = this.userRepository.exists(beneficiary.email.value)
    if (!(await exists).valueOf()) {
      await this.userRepository.add({ 
        name: beneficiary.name.value, 
        email: beneficiary.email.value, 
        plantype: beneficiary.plantype,
        RG: beneficiary.RG,
        CPF: beneficiary.CPF,
        birthDate: beneficiary.birthDate,
        dependent: beneficiary.dependent
       })
    }
    return right(beneficiaryData)
  }
}
