import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentaition/compenents'
import Context from '@/presentaition//context/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {mainError && <span className={Styles.error}>{mainError}</span>}
      {isLoading && <Spinner className={Styles.spinner} />}
    </div>
  )
}

export default FormStatus
