import * as Helper from '../utills/helpers';
import * as Http from '../utills/http-mocks';

const path = /surveys/;
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-result');

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnExpectedError', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
  });

  it('Should reload button on click', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
    mockSuccess();
    cy.getByTestId('reload').click();
    cy.getByTestId('question').should('exist');
  });
});
