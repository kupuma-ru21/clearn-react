import { RemoteAuthentication } from './remote-authentication';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test';
import { InvaildCredentialsError, UnexpectedError } from '@/domain/errors';
import { mockAuthentication, mockAuthenticationModel } from '@/domain/test';
import faker from 'faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Shoud call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  test('Shoud throw InvaildCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvaildCredentialsError());
  });

  test('Shoud throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockAuthenticationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthentication());

    await expect(account).toEqual(httpResult);
  });
});
