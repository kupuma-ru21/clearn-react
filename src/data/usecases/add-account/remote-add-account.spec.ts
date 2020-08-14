import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { RemoteAddAccount } from './remote-add-account'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account-model'
import { mockAddAccountParams } from '@/domain/test'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
  AddAccountParams,
  AccountModel
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccountParams', () => {
  test('Shoud call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Shoud call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const AddAccountParams = mockAddAccountParams()
    await sut.add(AddAccountParams)

    expect(httpPostClientSpy.body).toEqual(AddAccountParams)
  })
})
