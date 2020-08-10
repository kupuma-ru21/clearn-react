import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Header, Footer, Input, FormStatus } from '@/presentaition/compenents'
import Context from '@/presentaition/context/form/form-context'
import { Validation } from '@/presentaition/protocols/validation'

type Props = {
  validation: Validation
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    emailError: 'Campo obrigat6rio',
    email: '',
    password: '',
    passwordError: 'Campo obrigat6rio',
    mainError: ''
  })
  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])
  useEffect(() => {
    validation.validate({ password: state.password })
  }, [state.password])

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Enter
          </button>
          <span className={Styles.link}>Cliar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
