import 'jest-localstorage-mock'
import faker from 'faker'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => localStorage.clear())

  test('Should call localstorage with correct values', async () => {
    const key = faker.database.column()
    const value = faker.random.word()
    await makeSut().set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
