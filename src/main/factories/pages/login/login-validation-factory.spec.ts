import { makeLoginValidation } from './login-validation-factory'
import {
  ValidationComposite,
  ValidationBuilder as Builer
} from '@/validation/validators'

describe('LoginValidatiionFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builer.field('email').required().email().build(),
        ...Builer.field('password').required().min(5).build()
      ])
    )
  })
})
