import React from 'react'
import SignUp from './signup'
import { RenderResult, render } from '@testing-library/react'
import { Helper } from '@/presentation/test'

type SutType = {
  sut: RenderResult
}

const makeSut = (): SutType => {
  const sut = render(<SignUp />)
  return { sut }
}

describe('SignUp Component', () => {
  test('Shoud start with initial state', () => {
    const validationError = 'Comp obrigat6rio'
    const { sut } = makeSut()
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
