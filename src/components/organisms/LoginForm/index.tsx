import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '../../atoms/Button'
import FormInput from '../../molecules/FormInput'
import Captcha from '../../molecules/Captcha'

import { ILoginData } from '../../../interface/user'

import { MAX_INPUT_VALUE, MIN_INPUT_VALUE } from '../../../config'

import './styles.scss'

interface ILoginForm {
  onSubmitHandler: () => void
}

const schema = yup.object().shape({
  login: yup.string().min(MIN_INPUT_VALUE).required(),
  password: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required(),
  captcha: yup.string().required()
})

const LoginForm: React.FC<ILoginForm> = ({ onSubmitHandler }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitted }
  } = useForm<ILoginData>({ resolver: yupResolver(schema) })

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="login-form__input">
        <Controller
          name="login"
          control={control}
          render={({ field: { onBlur, onChange, name, ref } }) => (
            <FormInput
              type="login"
              label="Username"
              placeholder="Type your username..."
              id="login"
              errorText={errors.login?.message}
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              innerRef={ref}
            />
          )}
        />
      </div>
      <div className="login-form__input">
        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, name, ref } }) => (
            <FormInput
              type="password"
              label="Password"
              placeholder="Type your password..."
              id="password"
              errorText={errors.password?.message}
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              innerRef={ref}
            />
          )}
        />
      </div>
      <div className="login-form__captcha">
        <Controller
          name="captcha"
          control={control}
          render={({ field: { onBlur, onChange, name, ref } }) => (
            <Captcha
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              innerRef={ref}
              errorText={errors.captcha?.message}
            />
          )}
        />
      </div>
      <div className="form-buttons">
        <div className="login-form__button">
          <Button type="submit" buttonText="Log In" isMainButton isDisabled={isSubmitted && (!isDirty || !isValid)} />
        </div>
        <div className="login-form__button">
          <Button
            type="button"
            buttonText="Sign Up"
            onClickHandler={() => {
              console.log('woop')
            }}
          />
        </div>
      </div>
    </form>
  )
}

export default LoginForm
