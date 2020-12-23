import { IConsultBeneficiary } from './iconsult-beneficiary';
import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'
import { BeneficiaryRepository } from '../ports/beneficiary-repository'
import { InvalidEmailError } from '../../entities/beneficiary/errors/invalid-email';
import { InvalidNameError } from '../../entities/beneficiary/errors/invalid-name';
import { Either } from '../../shared/either';

export class ConsultBeneficiaryOnSystem implements IConsultBeneficiary {  
  private readonly userRepository: BeneficiaryRepository
  constructor (beneficiaryRepo: BeneficiaryRepository) {
    this.userRepository = beneficiaryRepo
  }
  
  ConsultBeneficiaryOnSystem: () => Promise<Either<InvalidNameError | InvalidEmailError, BeneficiaryData>[]>;
  

  async ConsultBeneficiaryOnSystem1 (): Promise<BeneficiaryData[]> {   
    const beneficiaryList = this.userRepository.findAllUsers()  
     return (beneficiaryList)
  }
}
