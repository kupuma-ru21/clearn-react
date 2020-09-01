import { AccountModel } from '@/domain/models';

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Model>;
}

export namespace AddAccount {
  export type Params = {
    email: string;
    password: string;
    name: string;
    passwordConfirmation: string;
  };

  export type Model = AccountModel;
}
