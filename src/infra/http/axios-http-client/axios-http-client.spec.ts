import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const makekSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Shoud call axios with correct URL and verb', async () => {
    const request = mockPostRequest()
    const sut = makekSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})

// describe('AxiosHttpClient', () => {
//   test('Shoud call axios with correct body', async () => {
//     const sut = makekSut();
//     await sut.post({ url: faker.internet.url() });
//     expect(mockedAxios.post).toHaveBeenCalledWith(url);
//   });
// });
