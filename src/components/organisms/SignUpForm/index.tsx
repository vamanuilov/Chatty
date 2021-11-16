import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm, UseFormClearErrors } from 'react-hook-form'

import { signUpSchema } from '../../../config/schemas'

import { POP_UP_LIFETIME } from '../../../config'

import Button from '../../atoms/Button'
import FormInput from '../../molecules/FormInput'
import CaptchaBlock from '../CaptchaBlock'
import Select from '../../molecules/Select'
import StubInput from '../../molecules/StubInput'

import user from '../../../store/user'
import popup from '../../../store/popup'

import './styles.scss'

import { ISignUpData } from '../../../interface/user'

import { ITextInputNames, RegisterInputFields } from './common'

interface ISignUpForm {
  onSubmitHandler: (data: ISignUpData) => void
  onRegisterAfterDelay?: () => void
  onAdditionalButtonClickHandler: () => void
}

const SignUpForm: React.FC<ISignUpForm> = ({
  onSubmitHandler,
  onRegisterAfterDelay,
  onAdditionalButtonClickHandler
}) => {
  const {
    control,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ISignUpData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      login: '',
      password: '',
      password_confirm: '',
      gender_id: undefined,
      name: '',
      captcha: ''
    }
  })
  const watchPassword = watch('password')
  const watchPasswordConfirm = watch('password_confirm')

  useEffect(() => {
    user.getGenders()
    user.resetErrors()
  }, [])

  useEffect(() => {
    if (user.isRegistered) {
      popup.setMessage({
        type: 'success',
        text: 'User successfully registered! \n Redirecting to login page...'
      })

      setTimeout(() => {
        onRegisterAfterDelay && onRegisterAfterDelay()
      }, POP_UP_LIFETIME)
    }
  }, [user.isRegistered])

  useEffect(() => {
    switch (user.error.type) {
      case 'captcha': {
        setError('captcha', {
          type: 'manual',
          message: user.error.message
        })
        break
      }
      case 'gender_id': {
        setError('gender_id', {
          type: 'manual',
          message: user.error.message
        })
        break
      }
      case 'general': {
        popup.setMessage({
          type: 'error',
          text: user.error.message
        })
        break
      }
      default: {
        if (RegisterInputFields.some((input) => input.type === user.error.type)) {
          setError(user.error.type as ITextInputNames, {
            type: 'manual',
            message: user.error.message
          })
        }
      }
    }
  }, [user.error])

  useEffect(() => {
    if (errors.password_confirm && watchPassword === watchPasswordConfirm) {
      clearErrors('password_confirm')
    }
  }, [watchPassword])

  return (
    <>
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmitHandler)}>
        {RegisterInputFields.map(({ inputName, type, label, placeholder, id }) => (
          <div className="sign-up-form__item" key={inputName}>
            <div className="sign-up-form__input">
              <Controller
                name={inputName}
                control={control}
                render={({ field: { onBlur, onChange, name, ref } }) => (
                  <FormInput
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    id={id}
                    errorText={errors[inputName]?.message}
                    onBlur={onBlur}
                    onChange={onChange}
                    name={name}
                    innerRef={ref}
                  />
                )}
              />
            </div>
          </div>
        ))}
        <div className="sign-up-form__item sign-up-form__select">
          {user.genders.length === 0 ? (
            <StubInput labelText="Select" isLoading={user.selectLoading} />
          ) : (
            <Controller
              name="gender_id"
              control={control}
              render={({ field: { onChange, name, ref } }) => (
                <Select
                  options={user.genders}
                  placeholder="Your gender"
                  label="Your gender"
                  errorText={errors.gender_id?.message}
                  onChange={(e) => {
                    onChange(e)
                    if (user.error.type === 'select') {
                      user.resetErrors()
                    }
                  }}
                  name={name}
                  innerRef={ref}
                />
              )}
            />
          )}
        </div>
        <div className="sign-up-form__item">
          <Controller
            name="captcha"
            control={control}
            render={({ field: { onBlur, onChange, name, ref } }) => (
              <CaptchaBlock
                resetError={clearErrors as UseFormClearErrors<Pick<ISignUpData, 'captcha'>>}
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
          <div className="sign-up-form__button">
            <Button isMainButton type="submit" buttonText="Sign Up" isDisabled={user.isLoading || !isDirty} />
          </div>
          <div className="sign-up-form__button">
            <Button buttonText="Login" onClickHandler={onAdditionalButtonClickHandler} />
          </div>
        </div>
      </form>
    </>
  )
}

export default observer(SignUpForm)
