import React from 'react';
import { useHistory } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import { LoadSurveyResult } from '@/domain/usecases';
import { Calendar } from '@/presentation/components';
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components';
import Styles from './result-styles.scss';

type Props = {
  surveyResult: LoadSurveyResult.Model;
};

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory();
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        <>
          {surveyResult.answers.map((answer) => (
            <SurveyResultAnswer key={answer.answer} answer={answer} />
          ))}
        </>
      </FlipMove>
      <button
        data-testid="back-button"
        className={Styles.button}
        onClick={goBack}
      >
        Volter
      </button>
    </>
  );
};

export default Result;
