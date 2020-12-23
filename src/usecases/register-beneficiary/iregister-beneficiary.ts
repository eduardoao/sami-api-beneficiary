import { RegisterBeneficiaryResponse } from './register-beneficiary-response'
import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'

export interface IRegisterBeneficiary {
  RegisterBeneficiaryOnSystem: (beneficiaryData: BeneficiaryData) => Promise<RegisterBeneficiaryResponse>
}
