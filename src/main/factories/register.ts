import { RegisterBeneficiaryController } from '../../adapters/presentation/controllers/register-beneficiary-controller'
import { RegisterBeneficiaryOnSystem } from '../../usecases/register-beneficiary/register-beneficiary-on-system'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'


export const makeRegisterUserController = (): RegisterBeneficiaryController => {
  const mongodbUserRepository = new MongodbUserRepository()  
  const registerBeneficiaryOnSystem = new RegisterBeneficiaryOnSystem(mongodbUserRepository)  
  const registerUserController = new RegisterBeneficiaryController(registerBeneficiaryOnSystem)
  return registerUserController
}
