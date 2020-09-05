import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AccessDeniedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, SurveyListHeader } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';
import {
  SurveyContext,
  Error,
  SurveyListItem,
} from '@/presentation/pages/survey-list/components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });
  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          history.replace('/login');
        }
        setState({ ...state, error: error.message });
      });
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <SurveyListHeader />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
