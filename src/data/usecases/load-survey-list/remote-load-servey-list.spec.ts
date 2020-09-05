import faker from 'faker';
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test';
import { UnexpectedError, AccessDeniedError } from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteLoadSurveyList } from './remote-load-servey-list';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return { httpGetClientSpy, sut };
};

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { httpGetClientSpy, sut } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Shoud throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Shoud throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Shoud return a list of RemoteLoadSurveyList.Models if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const suveyList = await sut.loadAll();

    await expect(suveyList).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        date: new Date(httpResult[0].date),
        didAnswer: httpResult[0].didAnswer,
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        date: new Date(httpResult[1].date),
        didAnswer: httpResult[1].didAnswer,
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        date: new Date(httpResult[2].date),
        didAnswer: httpResult[2].didAnswer,
      },
    ]);
  });

  test('Shoud return an empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const suveyList = await sut.loadAll();

    await expect(suveyList).toEqual([]);
  });
});
