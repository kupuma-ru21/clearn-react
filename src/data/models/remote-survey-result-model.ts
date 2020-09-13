export type RemoteSaveSurveyResultModel = {
  question: string;
  date: string;
  answers: RemoteSaveSurveyResultAnswerModel[];
};

export type RemoteSaveSurveyResultAnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
  isCurrentAccountAnswer: boolean;
};
