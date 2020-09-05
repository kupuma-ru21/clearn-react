import React, { memo, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';
import Styles from './survey-list-header-styles.scss';

const SurveyListHeader: React.FC = () => {
  const history = useHistory();
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);
  const logout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(SurveyListHeader);
