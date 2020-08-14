import {
  ValidationComposite,
  ValidationBuilder as Builer
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builer.field('name').required().min(5).build(),
    ...Builer.field('email').required().email().build(),
    ...Builer.field('password').required().min(5).build(),
    ...Builer.field('passwordConfirmation').required().min(5).build()
  ])
}
