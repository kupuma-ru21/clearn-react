import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/context'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
      {isLoading && <Spinner className={Styles.spinner} />}
    </div>
  )
}

export default FormStatus
