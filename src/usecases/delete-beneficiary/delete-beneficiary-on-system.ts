import { Email } from './../../entities/beneficiary/email'
import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'
import { BeneficiaryRepository } from '../ports/beneficiary-repository'
import { left, right, Either } from '../../shared/either'
import { IDeleteBeneficiary } from './idelete-beneficiary'
import { DeleteBeneficiaryResponse } from './delete-beneficiary-response'
import { Beneficiary } from '../../entities/beneficiary/beneficiary'
import { InvalidEmailError } from '../../entities/beneficiary/errors/invalid-email'


export class DeleteBeneficiaryOnSystem implements IDeleteBeneficiary {
  private readonly userRepository: BeneficiaryRepository

  constructor (beneficiaryRepo: BeneficiaryRepository) {
    this.userRepository = beneficiaryRepo
  }

  async DeleteBeneficiaryOnSystem (beneficiaryData: BeneficiaryData): Promise<DeleteBeneficiaryResponse> {
    const userOrError: Either<InvalidEmailError, Email> = Beneficiary.createEmail(beneficiaryData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const email = userOrError.value.value
    const exists = this.userRepository.exists(email)
    if ((await exists).valueOf()) {
      await this.userRepository.delete(email)
    }
    return right(beneficiaryData)
  }
}
