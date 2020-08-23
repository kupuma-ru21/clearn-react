import { UpdateCurrentAccount } from '@/domain/usecases'
import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { makeLocalStorageAdapter } from '@/main/factories/cahce/local-storage-adapter-factoy'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
