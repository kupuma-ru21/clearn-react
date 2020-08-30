import React from 'react';
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases';
import { SurveyList } from '@/presentation/pages';

export const makeSuveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />;
};

export default makeSuveyList;
