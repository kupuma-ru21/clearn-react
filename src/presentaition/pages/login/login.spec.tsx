import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentaition/test'
import faker from 'faker'

type SutType = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
};

type SutParams = {
  validationError: string
};

const makeSut = (params?: SutParams): SutType => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )
  return { sut, authenticationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Shoud start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

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
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})

describe('Shoud show spinner on submit', () => {
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
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})

describe('Shoud call Authentication with correct values', () => {
  test('Shoud start with initial state', () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, {
      target: { value: email }
    })
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, {
      target: { value: password }
    })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
})
