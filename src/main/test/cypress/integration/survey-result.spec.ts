import * as Helper from '../utills/helpers';
import * as Http from '../utills/http-mocks';

const path = /surveys/;
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');

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
});
