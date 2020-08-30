import { AxiosHttpClient } from './axios-http-client';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import { mockPostRequest, mockGetRequest } from '@/data/test';
import axios from 'axios';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makekSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Shoud call axios.post with correct values', async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makekSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Shoud return correct response on axios.post', async () => {
      const { sut, mockedAxios } = makekSut();
      const httpResponse = await sut.post(mockPostRequest());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    test('Shoud return correct errror on axios.post', () => {
      const { sut, mockedAxios } = makekSut();
      mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() });
      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });

  describe('get', () => {
    test('Shoud call axios.get with correct values', async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makekSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });

    test('Shoud return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makekSut();
      const httpResponse = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    test('Shoud return correct errror on axios.get', () => {
      const { sut, mockedAxios } = makekSut();
      mockedAxios.get.mockRejectedValueOnce({ response: mockHttpResponse() });
      const promise = sut.get(mockGetRequest());
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});
