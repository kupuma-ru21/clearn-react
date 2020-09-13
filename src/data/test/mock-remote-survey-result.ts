import faker from 'faker';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { SaveSurveyResult } from '@/domain/usecases';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10),
});

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: faker.random.boolean(),
    },
    {
      answer: faker.random.words(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: faker.random.boolean(),
    },
  ],
});
