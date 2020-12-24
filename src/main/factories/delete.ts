import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { DeleteBeneficiaryController } from '../../adapters/presentation/controllers/delete-beneficiary-controller'
import { DeleteBeneficiaryOnSystem } from '../../usecases/delete-beneficiary/delete-beneficiary-on-system'

export const makeDeleteBeneficiaryController = (): DeleteBeneficiaryController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const deleteBeneficiaryOnSystem = new DeleteBeneficiaryOnSystem(mongodbUserRepository)
  const deleteBeneficiaryController = new DeleteBeneficiaryController(deleteBeneficiaryOnSystem)
  return deleteBeneficiaryController
}
