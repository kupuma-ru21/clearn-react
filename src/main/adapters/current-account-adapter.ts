import { AccountModel } from '@/domain/models';
import { makeLocalStorageAdapter } from '@/main/factories/cahce/local-storage-adapter-factoy';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set('account', account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account');
};
