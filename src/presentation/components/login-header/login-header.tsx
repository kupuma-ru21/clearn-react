import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <div>
      <header className={Styles.headerWrap}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
    </div>
  )
}

export default memo(LoginHeader)
