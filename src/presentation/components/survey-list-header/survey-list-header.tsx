import React, { memo } from 'react'
import Styles from './survey-list-header-styles.scss'

const SurveyListHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <div className={Styles.logoutWrap}>
          <span>Rodrigo</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(SurveyListHeader)
