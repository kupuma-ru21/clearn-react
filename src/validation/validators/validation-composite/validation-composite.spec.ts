import faker from 'faker';
import { ValidationComposite } from './validation-composite';
import { FieldValidationSpy } from '@/validation/test/mock-field-validation';

type Suttype = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): Suttype => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationsSpy);
  return { sut, fieldValidationsSpy };
};

describe('ValidationComposite', () => {
  const fieldName = faker.database.column();

  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessage = faker.random.words();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBe(error);
  });

  test('Should return error if any validation fails', () => {
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
