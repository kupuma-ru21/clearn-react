import React from 'react';
import { useHistory } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import { LoadSurveyResult } from '@/domain/usecases';
import { Calendar } from '@/presentation/components';
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
        {surveyResult.answers.map((answer) => (
          <li
            data-testid="answer-wrap"
            key={answer.answer}
            className={answer.isCurrentAccountAnswer ? Styles.active : ''}
          >
            {answer.image && (
              <img data-testid="image" src={answer.image} alt={answer.answer} />
            )}
            <span data-testid="answer" className={Styles.answer}>
              {answer.answer}
            </span>
            <span data-testid="percent" className={Styles.percent}>
              {answer.percent}%
            </span>
          </li>
        ))}
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
