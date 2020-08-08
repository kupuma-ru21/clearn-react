import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const makekSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('Shoud call axios with correct URL and verb', async () => {
    const url = faker.internet.url()
    const sut = makekSut()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
