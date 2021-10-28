import React from 'react'
import Button from '../../atoms/Button'
import InputFieldBlock from '../../molekules/InputFieldBlock'

import './styles.scss'

interface ILoginProps {
  login: string
  password: string
  loginChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  passwordChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmitHandler: () => void
}

const LoginForm: React.FC<ILoginProps> = ({
  login,
  password,
  loginChangeHandler,
  passwordChangeHandler,
  onSubmitHandler
}) => {
  return (
    <form
      className="login-form"
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onSubmitHandler()
      }}
    >
      <div className="login-form__input">
        <InputFieldBlock
          type="login"
          onChangeHandler={loginChangeHandler}
          value={login}
          placeholder="Input user name..."
          id="username"
          label="User name"
          isRequired={true}
        />
      </div>
      <div className="login-form__input">
        <InputFieldBlock
          value={password}
          onChangeHandler={passwordChangeHandler}
          type="password"
          placeholder="Input password..."
          id="password"
          label="Password"
          isRequired={true}
        />
      </div>
      <div className="login-form__button">
        <Button type="submit" buttonText="Log In" />
      </div>
    </form>
  )
}

export default LoginForm
