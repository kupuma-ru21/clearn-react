import faker from 'faker';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { HttpGetClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  return { httpGetClientSpy, sut };
};

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Shoud throw AccessDeniedError if HttpGetClient returns 403', () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.load();
    expect(promise).rejects.toThrow(new AccessDeniedError());
  });
});
