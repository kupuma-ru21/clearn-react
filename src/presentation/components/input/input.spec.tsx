import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/context/form/form-context'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('InputComponent', () => {
  const fieldName = faker.database.column()
  test('Should begin with readOnly', () => {
    const sut = makeSut(fieldName)
    const input = sut.getByTestId(fieldName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const sut = makeSut(fieldName)
    const input = sut.getByTestId(fieldName) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const sut = makeSut(fieldName)
    const input = sut.getByTestId(fieldName)
    const label = sut.getByTestId(`${fieldName}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
