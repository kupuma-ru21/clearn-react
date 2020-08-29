import React, { useEffect } from 'react';
import Styles from './survey-list-styles.scss';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components';
import { Footer, SurveyListHeader } from '@/presentation/components';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll();
    })();
  }, []);

  return (
    <div className={Styles.surveyListWrap}>
      <SurveyListHeader />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
