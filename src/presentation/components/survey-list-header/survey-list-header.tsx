import React, { memo, useContext } from 'react';
import { ApiContext } from '@/presentation/context';
import { useLogout } from '@/presentation/hooks';
import Styles from './survey-list-header-styles.scss';

const SurveyListHeader: React.FC = () => {
  const logout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext);
  const buttonClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    logout();
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={buttonClick}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(SurveyListHeader);
