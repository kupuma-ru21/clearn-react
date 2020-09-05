import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { ApiContext } from '@/presentation/context';
import { SurveyListHeader } from '@/presentation/components';

describe('HeaderComponent', () => {
  test('Should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const setCurrentAccountMock = jest.fn();
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <SurveyListHeader />
        </Router>
      </ApiContext.Provider>
    );
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
