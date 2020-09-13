import React from 'react';
import { useParams } from 'react-router-dom';
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases';
import { SurveyResult } from '@/presentation/pages';

export const makeSuveyResult: React.FC = () => {
  const { id }: any = useParams();
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />;
};
