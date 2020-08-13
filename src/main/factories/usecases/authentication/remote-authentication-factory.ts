import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factories'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { Authentication } from '@/domain/usecases/authentication'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
