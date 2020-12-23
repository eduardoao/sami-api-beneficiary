import { BeneficiaryData } from './beneficiary-data'
import { Email } from './email'
import { Name } from './name'
import { InvalidEmailError } from './errors/invalid-email'
import { Either, left, right } from '../../shared/either'
import { InvalidNameError } from './errors/invalid-name'
import { PlanType } from './planType'

export class Beneficiary {
  public readonly name: Name
  public readonly email: Email
  public readonly plantype: PlanType
  public readonly RG: string
  public readonly CPF: string
  public readonly birthDate: Date
  public readonly dependent: number

  private constructor (
    name: Name, 
    email: Email,
    plantype: PlanType,
    RG: string,
    CPF: string,
    birthDate: Date,
    dependent: number) {
    this.name = name
    this.email = email
    this.plantype = plantype
    this.RG = RG
    this.CPF = CPF,
    this.birthDate = birthDate
    this.dependent = dependent

    Object.freeze(this)
  }

  static create (BeneficiaryData: BeneficiaryData): Either<InvalidNameError | InvalidEmailError, Beneficiary> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(BeneficiaryData.name)
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(BeneficiaryData.email)    
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }
    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const plantype: PlanType = BeneficiaryData.plantype
    // Todo Criar data value para os objetos abaixo
    const RG: string = BeneficiaryData.RG
    const CPF: string = BeneficiaryData.CPF
    const birthDate: Date = BeneficiaryData.birthDate
    const dependent: number = BeneficiaryData.dependent

    return right(new Beneficiary(name, email, plantype, RG, CPF,birthDate, dependent))
  }
}
