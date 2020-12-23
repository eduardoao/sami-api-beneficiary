import { Either } from '../../shared/either'
import { InvalidEmailError } from '../../entities/beneficiary/errors/invalid-email'
import { InvalidNameError } from '../../entities/beneficiary/errors/invalid-name'
import { BeneficiaryData } from '../../entities/beneficiary/beneficiary-data'

export type DeleteBeneficiaryResponse = Either<InvalidNameError | InvalidEmailError, BeneficiaryData>
