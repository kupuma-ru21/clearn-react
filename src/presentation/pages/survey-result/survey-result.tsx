import React from 'react';
import FlipMove from 'react-flip-move';
import {
  SurveyListHeader,
  Footer,
  Loading,
  Calendar,
} from '@/presentation/components';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <SurveyListHeader />
      <div className={Styles.contentWrap}>
        {true && (
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
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
