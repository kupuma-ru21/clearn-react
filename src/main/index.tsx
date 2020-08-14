import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import { makeLogin } from '@/main/factories/pages/login/login-factories'
import { makeSignUp } from './factories/pages/signup/signup-factories'
import '@/presentation/styles/global.scss'

ReactDOM.render(
  <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />,
  document.getElementById('main')
)
