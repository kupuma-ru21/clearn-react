import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockSurveyModel } from '@/domain/test';
import { IconName } from '@/presentation/components';
import { SurveyItem } from '@/presentation/pages/survey-list/components';

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      `http://localhost/${IconName.thumUp}`
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      `http://localhost/${IconName.thumDown}`
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });
});
