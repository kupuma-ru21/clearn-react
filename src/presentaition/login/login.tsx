import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentaition/compenents/spinner/spinner'
import Header from '@/presentaition/compenents/login-header/login-header'
import Footer from '@/presentaition/compenents/login-footer/login-footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles.inpuWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inpuWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={Styles.status}>🔴</span>
        </div>

        <button className={Styles.submit} type="submit">
          Enter
        </button>
        <span className={Styles.link}>Cliar conta</span>

        <div className={Styles.errorWrap}>
          <span className={Styles.error}>Error</span>
          <Spinner className={Styles.spinner} />
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login