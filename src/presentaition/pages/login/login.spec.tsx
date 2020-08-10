import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentaition/test'
import faker from 'faker'

type SutType = {
  sut: RenderResult
};

type SutParams = {
  validationError: string
};

const makeSut = (params?: SutParams): SutType => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return { sut }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Shoud start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const sbmitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(sbmitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })
})

describe('Shoud show email error if Validation fails', () => {
  test('Shoud start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })
})

describe('Shoud show password error if Validation fails', () => {
  test('Shoud start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })
})

describe('Shoud show valid email state if Validation succeed', () => {
  test('Shoud start with initial state', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Todo certo!')
    expect(emailStatus.textContent).toBe('🔵')
  })
})

describe('Shoud show valid password state if Validation succeed', () => {
  test('Shoud start with initial state', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Todo certo!')
    expect(passwordStatus.textContent).toBe('🔵')
  })
})

describe('Shoud enable submit button if form is valid', () => {
  test('Shoud start with initial state', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const sbmitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(sbmitButton.disabled).toBe(false)
  })
})
