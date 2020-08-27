import React from 'react'
import Styles from './survey-list-styles.scss'
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import { Footer, SurveyListHeader } from '@/presentation/components'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <SurveyListHeader />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
