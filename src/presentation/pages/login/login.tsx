import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'
import {
  Header,
  Footer,
  Input,
  FormStatus,
  SubmitButton
} from '@/presentation/components'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken
}: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormIvalid: true,
    emailError: '',
    email: '',
    password: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    const { email, password } = state
    const formdata = { email, password }
    const emailError = validation.validate('email', formdata)
    const passwordError = validation.validate('password', formdata)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormIvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormIvalid) return
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton text={'Enter'} />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Cliar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
