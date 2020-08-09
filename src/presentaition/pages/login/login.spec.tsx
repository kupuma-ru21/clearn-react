import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
  test('Shoud start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const sbmitButton = getByTestId('submit') as HTMLButtonElement
    expect(sbmitButton.disabled).toBe(true)
  })
})
