import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor
} from '@testing-library/react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentaition/test'
import faker from 'faker'
import { InvaildCredentialsError } from '@/domain/errors'

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

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, {
    target: { value: email }
  })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, {
    target: { value: password }
  })
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Todo certo!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🔵')
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
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })
})

describe('Shoud show email error if Validation fails', () => {
  test('Shoud start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })
})

describe('Shoud show password error if Validation fails', () => {
  test('Shoud start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })
})

describe('Shoud show valid email state if Validation succeed', () => {
  test('Shoud start with initial state', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })
})

describe('Shoud show valid password state if Validation succeed', () => {
  test('Shoud start with initial state', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
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
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})

describe('Shoud call Authentication with correct values', () => {
  test('Shoud start with initial state', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
})

describe('Shoud call Authentication only once', () => {
  test('Shoud start with initial state', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })
})

describe('Shoud not call Authentication if form is valid', () => {
  test('Shoud start with initial state', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})

describe('Shoud present error if Authentication fails', () => {
  test('Shoud start with initial state', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvaildCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValue(Promise.reject(error))
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })
})
