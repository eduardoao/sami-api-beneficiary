import { PlanType } from './plantype';
import { left } from '../../shared/either'
import { InvalidEmailError } from './errors/invalid-email'
import { InvalidNameError } from './errors/invalid-name'
import { User } from './beneficiary'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail', async () => {
    const email = 'not_an_email'
    const plantype = PlanType.Basic
    const userOrError = User.create({ name: 'Otavio', email: email, plantype: plantype })
    expect(userOrError).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid name (too few characters)', async () => {
    const name = 'O'
    const plantype = PlanType.Basic
    const user = User.create({ name: name, email: 'otaviolemos@gmail.com', plantype: plantype })
    expect(user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create user with invalid name (too many characters)', async () => {
    let name: string = ''
    for (let i = 0; i < 256; i++) {
      name += 'c'
    }
    const plantype = PlanType.Basic
    const user = User.create({ name: name, email: 'otaviolemos@gmail.com', plantype: plantype })
    expect(user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create user with invalid name (only blank spaces)', async () => {
    const name = '   '
    const plantype = PlanType.Basic
    const user = User.create({ name: name, email: 'otaviolemos@gmail.com' , plantype})
    expect(user).toEqual(left(new InvalidNameError(name)))
  })
})
