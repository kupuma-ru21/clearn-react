import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './login'

type SutType = {
  sut: RenderResult
};

const makeSut = (): SutType => {
  const sut = render(<Login />)
  return { sut }
}

describe('Login Component', () => {
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
