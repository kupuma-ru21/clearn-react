import React from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentaition/compenents'

const FormStatus: React.FC = () => (
  <div className={Styles.errorWrap}>
    <span className={Styles.error}>Error</span>
    <Spinner className={Styles.spinner} />
  </div>
)

export default FormStatus
