import faker from 'faker';
import * as FormHelper from '../utills/form-helpers';
import * as Helper from '../utills/helpers';
import * as Http from '../utills/http-mocks';

const path = /login/;
const mockInvalidCredentialsError = (): void => Http.mockUnauthorizeError(path);
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST');
const mockSuccess = (): void => Http.mockOk(path, 'POST', 'fx:account');

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigat6rio');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigat6rio');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Valor invalido');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Valor invalido');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentinalsError on 401', () => {
    mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testMainError('Credentials invailds');
    Helper.testUrl('/login');
  });

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
    Helper.testUrl('/login');
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    mockSuccess();

    simulateValidSubmit();
    cy.getByTestId('error-wrap').should('not.have.descendants');
    Helper.testUrl('/');
    Helper.testLocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    mockSuccess();
    populateFields();
    cy.getByTestId('submit').dblclick();
    Helper.testHttpCallCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    mockSuccess();
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');
    Helper.testHttpCallCount(0);
  });
});
