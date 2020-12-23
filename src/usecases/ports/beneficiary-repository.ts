import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'

export interface BeneficiaryRepository {
  findAllUsers: () => Promise<BeneficiaryData[]>
  findUserByEmail: (email: string) => Promise<BeneficiaryData>
  add: (user: BeneficiaryData) => Promise<void>
  exists: (email: string) => Promise<boolean>
  update: (user: BeneficiaryData) => Promise<void>
  delete: (id: string) => Promise<void>  
}
