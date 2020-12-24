import { ConsultBeneficiaryResponse } from './consult-beneficiary-response'

export interface IConsultBeneficiary {
  ConsultBeneficiaryOnSystem: () => Promise<ConsultBeneficiaryResponse>
}
