import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '../models'
import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAcountModel = (): AccountModel => ({
  accesToken: faker.random.uuid()
})
