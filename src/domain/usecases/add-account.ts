import { AccountModel } from '@/domain/models'

export type AddAccountParams = {
  email: string
  password: string
  name: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
