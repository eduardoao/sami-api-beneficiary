import { DeleteBeneficiaryResponse } from './delete-beneficiary-response'
import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'

export interface IDeleteBeneficiary {
  DeleteBeneficiaryOnSystem: (beneficiaryData: BeneficiaryData) => Promise<DeleteBeneficiaryResponse>
}
