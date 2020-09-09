import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, SurveyListHeader } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
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
  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({ ...old, error: error.message }));
  });
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });
  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((old) => ({ ...old, surveys })))
      .catch(handleError);
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
