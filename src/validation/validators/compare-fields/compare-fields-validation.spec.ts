import { CompareFieldValidation } from './compare-fields-validation';
import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare);

describe('CompareFieldValidation', () => {
  const field = 'any_field';
  const fieldToCompare = 'other_field';
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value',
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if compare is valid', () => {
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
