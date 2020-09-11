import React from 'react';
import { makeRemoteAddAccount } from '@/main/factories//usecases/add-account/remote-add-account-factory';
import { SignUp } from '@/presentation/pages';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  );
};
