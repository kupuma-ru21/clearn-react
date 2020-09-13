import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorator';
import { makeApiUrl } from '@/main/factories/http';
import { LoadSurveyResult } from '@/domain/usecases';
import { RemoteLoadSurveyResult } from '@/data/usecases';

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  );
};
