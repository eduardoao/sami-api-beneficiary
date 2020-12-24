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
  

  async UpdateBeneficiaryOnSystem (beneficiaryData: BeneficiaryData): Promise<UpdateBeneficiaryResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, Beneficiary> = Beneficiary.create(beneficiaryData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const exists = this.userRepository.findUserByEmail(beneficiaryData.email)
    if ((await exists).valueOf()) {
      await this.userRepository.update(beneficiaryData)
    }
    return right(beneficiaryData)
  }
}
