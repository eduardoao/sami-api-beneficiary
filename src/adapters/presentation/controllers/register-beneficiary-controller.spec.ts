import { RegisterBeneficiaryController } from './register-beneficiary-controller'
import { MissingParamError, ServerError } from './errors'
import { left, right } from '../../../shared/either'
import { RegisterBeneficiary } from '../../../usecases/register-beneficiary/register-beneficiary'
import { BeneficiaryData } from '../../../entities/beneficiary/beneficiary-data'
import { RegisterBeneficiaryResponse } from '../../../usecases/register-beneficiary/register-beneficiary-response'

import { InvalidNameError } from '../../../entities/beneficiary/errors/invalid-name'
import { InvalidEmailError } from '../../../entities/beneficiary/errors/invalid-email'

interface SutType {
  sut: RegisterBeneficiaryController
  RegisterBeneficiaryStub: RegisterBeneficiary 
}

const makeRegisterBeneficiary = (): RegisterBeneficiary => {
  class RegisterBeneficiaryOnSystemStub implements RegisterBeneficiary {
    async RegisterBeneficiaryOnSystem (beneficiary: BeneficiaryData): Promise<RegisterBeneficiaryResponse> {
      return await Promise.resolve(right(beneficiary))
    }
  }
  return new RegisterBeneficiaryOnSystemStub()
}


const makeSut = (): SutType => {
  const RegisterBeneficiaryStub = makeRegisterBeneficiary()  
  const sut = new RegisterBeneficiaryController(RegisterBeneficiaryStub)
  return { sut, RegisterBeneficiaryStub }
}

describe('Register User Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name').message)
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email').message)
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, RegisterBeneficiaryStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email'
      }
    }
    jest.spyOn(RegisterBeneficiaryStub, 'RegisterBeneficiaryOnSystem').mockImplementationOnce(
      async (user: BeneficiaryData) => {
        return await Promise.resolve(left(new InvalidEmailError(user.email)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidEmailError(httpRequest.body.email).message)
  })

  test('should return 400 if an invalid name is provided', async () => {
    const { sut, RegisterBeneficiaryStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'O',
        email: 'valid@mail.com'
      }
    }
    jest.spyOn(RegisterBeneficiaryStub, 'RegisterBeneficiaryOnSystem').mockImplementationOnce(
      async (user: BeneficiaryData) => {
        return await Promise.resolve(left(new InvalidNameError(user.name)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidNameError(httpRequest.body.name).message)
  })

  test('should call RegisterBeneficiaryOnSystem with correct values and return 200', async () => {
    const { sut, RegisterBeneficiaryStub } = makeSut()
    const registerSpy = jest.spyOn(RegisterBeneficiaryStub, 'RegisterBeneficiaryOnSystem')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(registerSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(response.statusCode).toEqual(200)
  })


  test('should return 500 if register user throws', async () => {
    const { sut, RegisterBeneficiaryStub } = makeSut()
    jest.spyOn(RegisterBeneficiaryStub, 'RegisterBeneficiaryOnSystem').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toEqual(500)
    expect((response.body as ServerError).message).toEqual('Server error: internal.')
  })  
})
