import React, { useState } from 'react';
import FlipMove from 'react-flip-move';
import { LoadSurveyResult } from '@/domain/usecases';
import {
  SurveyListHeader,
  Footer,
  Loading,
  Calendar,
  Error,
} from '@/presentation/components';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  });
  return (
    <div className={Styles.surveyResultWrap}>
      <SurveyListHeader />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>
                Qual e seu framework web favorito? Qual e seu framework web
                favorito? Qual e seu framework web favorito?
              </h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Volter</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
