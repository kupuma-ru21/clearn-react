import React from 'react'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/save-access-token-factoy'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories//usecases/add-account/remote-add-account-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}

export default makeSignUp
