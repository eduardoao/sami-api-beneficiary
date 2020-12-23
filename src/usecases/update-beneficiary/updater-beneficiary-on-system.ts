import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'
import { BeneficiaryRepository } from '../ports/beneficiary-repository'
import { left, right, Either } from '../../shared/either'
import { IUpdateBeneficiary } from './iupdate-beneficiary'
import { UpdateBeneficiaryResponse } from './update-beneficiary-response'
import { Beneficiary } from '../../entities/beneficiary/beneficiary'
import { InvalidNameError } from '../../entities/beneficiary/errors/invalid-name'
import { InvalidEmailError } from '../../entities/beneficiary/errors/invalid-email'

export class UpdateBeneficiaryOnSystem implements IUpdateBeneficiary {
  private readonly userRepository: BeneficiaryRepository

  constructor (beneficiaryRepo: BeneficiaryRepository) {
    this.userRepository = beneficiaryRepo
  }
  UpdateBeneficiaryOnSystem: (beneficiaryData: BeneficiaryData) => Promise<any>

  async RegisterBeneficiaryOnSystem (beneficiaryData: BeneficiaryData): Promise<UpdateBeneficiaryResponse> {
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
