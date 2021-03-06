import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { RemoteSaveSurveyResultModel } from '@/data/models';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadSurveyResult } from '@/domain/usecases';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
    const remoteLoadSurveyResult = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign({}, remoteLoadSurveyResult, {
          date: new Date(remoteLoadSurveyResult.date),
        });
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSaveSurveyResultModel;
}
