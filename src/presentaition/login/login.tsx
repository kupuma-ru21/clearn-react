import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentaition/compenents/spinner/spinner'
import Logo from '@/presentaition/compenents/logo/logo'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
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
      <footer className={Styles.footer} />
    </div>
  )
}

export default Login
