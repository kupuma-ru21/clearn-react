import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import Login from './login'
import { Validation } from '@/presentaition/protocols/validation'

type SutType = {
  sut: RenderResult
  validationSpy: ValidationSpy
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutType => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return { sut, validationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Shoud start with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const sbmitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(sbmitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigat6rio')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigat6rio')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})

describe('Shoud call Validation with correct password', () => {
  test('Shoud start with initial state', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.input).toEqual({ password: 'any_password' })
  })
})
