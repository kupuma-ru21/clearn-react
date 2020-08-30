import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factories';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { LoadSurveyList } from '@/domain/usecases';
import { RemoteLoadSurveyList } from '@/data/usecases';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAxiosHttpClient()
  );
};
