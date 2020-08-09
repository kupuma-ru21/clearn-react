import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentaition/compenents'
import Context from '@/presentaition//context/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
      {isLoading && <Spinner className={Styles.spinner} />}
    </div>
  )
}

export default FormStatus
