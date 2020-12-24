import { BeneficiaryRepository } from './../ports/beneficiary-repository'
import { IConsultBeneficiary } from './iconsult-beneficiary'
import { ConsultBeneficiaryResponse } from './consult-beneficiary-response'

export class ConsultBeneficiaryOnSystem implements IConsultBeneficiary {
  private readonly userRepository: BeneficiaryRepository
  constructor (beneficiaryRepo: BeneficiaryRepository) {
    this.userRepository = beneficiaryRepo
  }

  async ConsultBeneficiaryOnSystem (): Promise<ConsultBeneficiaryResponse> {
    return (await this.userRepository.findAllUsers())
  }
}
