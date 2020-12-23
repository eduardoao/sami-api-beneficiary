import { PlanType } from './plantype';

export interface BeneficiaryData {
  name: string
  email: string
  plantype: PlanType
  RG: string
  CPF: string
  birthDate: Date
  dependent: number 
}
