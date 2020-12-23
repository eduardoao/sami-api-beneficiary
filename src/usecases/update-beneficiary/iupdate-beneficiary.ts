import { UpdateBeneficiaryResponse } from './update-beneficiary-response'
import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'

export interface IUpdateBeneficiary {
  UpdateBeneficiaryOnSystem: (beneficiaryData: BeneficiaryData) => Promise<UpdateBeneficiaryResponse>
}
