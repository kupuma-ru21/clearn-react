import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, SurveyListHeader } from '@/presentation/components';
import {
  SurveyContext,
  Error,
  SurveyListItem,
} from '@/presentation/pages/survey-list/components';
import { SurveyModel } from '@/domain/models';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false,
  });
  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => setState({ ...state, error: error.message }));
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
