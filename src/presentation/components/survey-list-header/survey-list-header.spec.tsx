import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AccountModel } from '@/domain/models';
import { SurveyListHeader } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SurveyListHeader />
      </Router>
    </ApiContext.Provider>
  );
  return { history, setCurrentAccountMock };
};

describe('HeaderComponent', () => {
  test('Should call setCurrentAccount with null', () => {
    const { setCurrentAccountMock, history } = makeSut();
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
