import React from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import {
  SurveyItemEmpty,
  SurveyItem,
} from '@/presentation/pages/survey-list/components';
import Styles from './list-styles.scss';

type Props = {
  surveys: LoadSurveyList.Model[];
};

const SurveyListItem: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default SurveyListItem;
