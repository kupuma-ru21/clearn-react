import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentaition/compenents'
import { makeLogin } from '@/main/factories/pages/login/login-factories'
import '@/presentaition/styles/global.scss'

ReactDOM.render(
  <Router makeLogin={makeLogin} />,
  document.getElementById('main')
)
