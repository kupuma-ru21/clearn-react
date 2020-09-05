import * as Helper from '../utills/helpers';

describe('Private Route', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('');
    Helper.testUrl('/login');
  });
});
