import { makeSignUpValidation } from './signup-validation-factory';
import {
  ValidationComposite,
  RequiredFieldValidation,
  MinLengthValidation,
  EmailValidation,
} from '@/validation/validators';
import { CompareFieldValidation } from '@/validation/validators/compare-fields/compare-fields-validation';

describe('SignUpValidatiionFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldValidation('passwordConfirmation', 'password'),
      ])
    );
  });
});
