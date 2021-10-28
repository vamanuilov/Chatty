import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '../../atoms/Button'
import InputFieldBlock from '../../molekules/InputFieldBlock'

import { IFormInputs } from '../../../interface/input'

import './styles.scss'

interface ILoginForm {
  onSubmitHandler: () => void
}

const MIN_INPUT_VALUE: number = 2
const MAX_INPUT_VALUE: number = 10

const schema = yup.object().shape({
  login: yup.string().min(MIN_INPUT_VALUE).required(),
  password: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required()
})

const LoginForm: React.FC<ILoginForm> = ({ onSubmitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) })

  const usernameRegister = register('login')
  const passwordRegister = register('password')

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="login-form__input">
        <InputFieldBlock
          type="login"
          placeholder="Input user name..."
          id="username"
          label="User name"
          errorText={errors.login?.message}
          {...usernameRegister}
        />
      </div>
      <div className="login-form__input">
        <InputFieldBlock
          type="password"
          placeholder="Input password..."
          id="password"
          label="Password"
          errorText={errors.password?.message}
          {...passwordRegister}
        />
      </div>
      <div className="login-form__button">
        <Button type="submit" buttonText="Log In" />
      </div>
    </form>
  )
}

export default LoginForm
