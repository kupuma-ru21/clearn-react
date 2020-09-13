import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorator';
import { makeApiUrl } from '@/main/factories/http';
import { SaveSurveyResult } from '@/domain/usecases';
import { RemoteSaveSurveyResult } from '@/data/usecases';

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  );
};
