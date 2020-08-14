import { makeSignUpValidation } from './signup-validation-factory'
import {
  ValidationComposite,
  ValidationBuilder as Builer
} from '@/validation/validators'

describe('SignUpValidatiionFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builer.field('name').required().min(5).build(),
        ...Builer.field('email').required().email().build(),
        ...Builer.field('password').required().min(5).build(),
        ...Builer.field('passwordConfirmation').required().min(5).build()
      ])
    )
  })
})
