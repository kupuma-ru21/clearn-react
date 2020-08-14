import React from 'react'
import faker from 'faker'
import { RenderResult, render, cleanup } from '@testing-library/react'
import SignUp from './signup'
import { Helper, ValidationStub } from '@/presentation/test'

type SutType = {
  sut: RenderResult
}
type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutType => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<SignUp validation={validationStub} />)
  return { sut }
}

describe('SignUp Component', () => {
  const validationError = faker.random.words()
  afterEach(cleanup)

  test('Shoud start with initial state', () => {
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', 'Comp obrigat6rio')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Comp obrigat6rio')
  })

  test('Shoud show name error if Validation fails', () => {
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Shoud show email error if Validation fails', () => {
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })
})
