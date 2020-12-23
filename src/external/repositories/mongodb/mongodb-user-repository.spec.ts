import { PlanType } from './../../../entities/beneficiary/plantype';
import { MongoHelper } from './helpers/mongo-helper'
import { MongodbUserRepository } from './mongodb-user-repository'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users')
  })

  test('should add user', async () => {
    var date = new Date()
    const sut = new MongodbUserRepository()
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      plantype: PlanType.Basic,
      RG: "123",
      CPF: "324",
      birthDate: date,
      dependent: 1
    })
    const user = await sut.findUserByEmail('any_email@mail.com')
    expect(user.name).toEqual('any_name')
  })

  test('when user is added, it should exist', async () => {
    const sut = new MongodbUserRepository()
    var date = new Date()
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      plantype: PlanType.Basic,
      RG: "123",
      CPF: "324",
      birthDate: date,
      dependent: 1
    })
    expect(await sut.exists('any_email@mail.com')).toBeTruthy()
  })

  test('when user is not added, it should not exist', async () => {
    const sut = new MongodbUserRepository()
    expect(await sut.exists('any_email@mail.com')).toBeFalsy()
  })

  test('find all should return all added users', async () => {
    const sut = new MongodbUserRepository()
    var date = new Date()
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      plantype: PlanType.Basic,
      RG: "123",
      CPF: "324",
      birthDate: date,
      dependent: 1
    })
    var date = new Date()
    await sut.add({
      name: '2any_name',
      email: '2any_email@mail.com',
      plantype: PlanType.Basic,
      RG: "1223",
      CPF: "2324",
      birthDate: date,
      dependent: 2
    })
    const users = await sut.findAllUsers()
    expect(users[0].name).toEqual('any_name')
    expect(users[1].name).toEqual('2any_name')
  })
})
