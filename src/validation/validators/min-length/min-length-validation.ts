import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLebgth: number) {}
  validate (value: string): Error {
    return value.length >= this.minLebgth ? null : new InvalidFieldError()
  }
}
