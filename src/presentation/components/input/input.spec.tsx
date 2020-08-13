import React from 'react'
import { render } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/context/form/form-context'

describe('InputComponent', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    )
    const field = getByTestId('field') as HTMLInputElement
    expect(field.readOnly).toBe(true)
  })
})
