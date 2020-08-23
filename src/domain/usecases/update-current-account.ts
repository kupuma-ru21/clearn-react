import { AccountModel } from '@/domain/models'

export interface UpdateCurrentAccount {
  save: (access: AccountModel) => Promise<void>
}
