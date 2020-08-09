import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentaition/compenents'
import Context from '@/presentaition//context/form/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {errorState.main && (
        <span className={Styles.error}>{errorState.main}</span>
      )}
      {state.isLoading && <Spinner className={Styles.spinner} />}
    </div>
  )
}

export default FormStatus
