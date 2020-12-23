import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'
import { BeneficiaryRepository } from '../ports/beneficiary-repository'
import { left, right, Either } from '../../shared/either'
import { IDeleteBeneficiary } from './idelete-beneficiary'
import { DeleteBeneficiaryResponse } from './delete-beneficiary-response'
import { Beneficiary } from '../../entities/beneficiary/beneficiary'
import { InvalidNameError } from '../../entities/beneficiary/errors/invalid-name'
import { InvalidEmailError } from '../../entities/beneficiary/errors/invalid-email'


export class DeleteBeneficiaryOnSystem implements IDeleteBeneficiary {
  private readonly userRepository: BeneficiaryRepository

  constructor (beneficiaryRepo: BeneficiaryRepository) {
    this.userRepository = beneficiaryRepo
  }
  DeleteBeneficiaryOnSystem: (beneficiaryData: BeneficiaryData) => Promise<Either<InvalidNameError | InvalidEmailError, BeneficiaryData>>

  async RegisterBeneficiaryOnSystem (beneficiaryData: BeneficiaryData): Promise<DeleteBeneficiaryResponse> {
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
