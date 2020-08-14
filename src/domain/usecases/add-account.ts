import { AccountModel } from '@/domain/models/account-model'

export type AddAccountParams = {
  email: string
  password: string
  name: string
  passwordConfirmation: string
}

export interface AddAccount {
  auth: (params: AddAccountParams) => Promise<AccountModel>
}
