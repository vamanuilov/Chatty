import LoginForm from '../../organisms/LoginForm'
import Image from '../../atoms/Image'
import Heading from '../../atoms/Heading'

import background from '../../../assets/images/background.png'
import './style.scss'
import Logo from '../../organisms/Logo'
import React, { useCallback, useState } from 'react'

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin && setLogin(e.target.value)
  }, [])

  const passwordChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword && setPassword(e.target.value)
  }, [])

  const backgroundSize = { height: 'auto', width: '1300px' }

  return (
    <div className="login-page">
      <div className="login-page__img">
        <Image src={background} altText="background" size={backgroundSize} />
      </div>
      <div className="login-page__form">
        <div className="form-content">
          <Logo />
          <Heading element="h1">
            Welcome to <span className="form-content__span_plain-text">Chatty</span>
            <span className="form-content__span_exc-mark">!</span>
          </Heading>
          <Heading element="h2">Please, authorize yourself</Heading>
        </div>
        <LoginForm
          login={login}
          password={password}
          loginChangeHandler={loginChangeHandler}
          passwordChangeHandler={passwordChangeHandler}
        />
      </div>
    </div>
  )
}

export default LoginPage
