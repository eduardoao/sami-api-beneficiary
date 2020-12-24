import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { ConsultBeneficiaryController } from '../../adapters/presentation/controllers/consult-beneficiary-controller'
import { ConsultBeneficiaryOnSystem } from '../../usecases/consult-beneficiary/consult-beneficiary-on-system'

export const makeConsultBeneficiaryController = (): ConsultBeneficiaryController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const consultBeneficiaryOnSystem = new ConsultBeneficiaryOnSystem(mongodbUserRepository)
  const consultBeneficiaryController = new ConsultBeneficiaryController(consultBeneficiaryOnSystem)
  return consultBeneficiaryController
}
