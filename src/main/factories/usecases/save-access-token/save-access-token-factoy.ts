import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccessToken } from '@/data/usecases/local-save-access-token/local-save-access-token'
import { makeLocalStorageAdapter } from '@/main/factories/cahce/local-storage-adapter-factoy'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
