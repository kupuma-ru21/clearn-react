import faker from 'faker';
import { HttpGetParams } from '@/data/protocols/http';
import { mockGetRequest, GetStorageSpy, HttpGetClientSpy } from '@/data/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { mockAccountModel } from '@/domain/test';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  );
  return { getStorageSpy, sut, httpGetClientSpy };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { getStorageSpy, sut } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  test('Should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: { field: faker.random.words() },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });

  test('Should add headers if getStorage to HttpClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });
});
