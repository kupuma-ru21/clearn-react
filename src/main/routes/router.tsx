import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factories';
import { makeLogin } from '@/main/factories/pages/login/login-factories';
import { PrivateRoute } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';
import { SurveyList } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
