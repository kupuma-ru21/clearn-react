import faker from 'faker';
import { HttpClientSpy } from '@/data/test';
import { RemoteAddAccount } from './remote-add-account';
import { mockAddAccountParams, mockAddAccountModel } from '@/domain/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>();
  const sut = new RemoteAddAccount(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAddAccountParams', () => {
  test('Shoud call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(addAccountParams);
  });

  test('Shoud throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Shoud throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud return an AddAccountModel if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockAddAccountModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());

    await expect(account).toEqual(httpResult);
  });
});
