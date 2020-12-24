import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { UpdateBeneficiaryController } from '../../adapters/presentation/controllers/update-beneficiary-controller'
import { UpdateBeneficiaryOnSystem } from '../../usecases/update-beneficiary/updater-beneficiary-on-system'

export const makeUpdateBeneficiaryController = (): UpdateBeneficiaryController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const updateBeneficiaryOnSystem = new UpdateBeneficiaryOnSystem(mongodbUserRepository)
  const updateBeneficiaryController = new UpdateBeneficiaryController(updateBeneficiaryOnSystem)
  return updateBeneficiaryController
}
