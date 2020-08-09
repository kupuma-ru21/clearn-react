import React from 'react'
import Styles from './login-styles.scss'
import Header from '@/presentaition/compenents/login-header/login-header'
import Footer from '@/presentaition/compenents/login-footer/login-footer'
import Input from '@/presentaition/compenents/input/input'
import FormStatus from '@/presentaition/compenents/form-status/form-status'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className={Styles.submit} type="submit">
          Enter
        </button>
        <span className={Styles.link}>Cliar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
