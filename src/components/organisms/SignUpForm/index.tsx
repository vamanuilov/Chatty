import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import './styles.scss'

import { MAX_INPUT_VALUE, MIN_INPUT_VALUE } from '../../../config'

import Button from '../../atoms/Button'
import FormInput from '../../molecules/FormInput'
import Captcha from '../../molecules/Captcha'
import Select from '../../molecules/Select'
import PopUp from '../PopUp'

import user from '../../../store/user'

import { ISignUpData } from '../../../interface/user'

type ITextInputNames = 'login' | 'password' | 'password_confirm' | 'name'

interface ITextInput {
  inputName: ITextInputNames
  type: 'text' | 'login' | 'password'
  label: string
  placeholder: string
  id: string
}

interface IPopUpMessage {
  type: 'success' | 'error' | ''
  message: string
}

interface ISignUpForm {
  onSubmitHandler: (data: ISignUpData) => void
  onRegisterAfterDelay?: () => void
  onAdditionalButtonClickHandler: () => void
}

const POP_UP_LIFETIME = 2000

const RegisterInputFields: ITextInput[] = [
  {
    inputName: 'login',
    type: 'login',
    label: 'Create user name',
    placeholder: 'Create user name',
    id: 'login'
  },
  {
    inputName: 'password',
    type: 'password',
    label: 'Create password',
    placeholder: 'Create password',
    id: 'password'
  },
  {
    inputName: 'password_confirm',
    type: 'password',
    label: 'Password confirmation',
    placeholder: 'Confirm password',
    id: 'password_confirm'
  },
  {
    inputName: 'name',
    type: 'text',
    label: 'Nickname',
    placeholder: 'Nickname',
    id: 'name'
  }
]

const schema = yup.object().shape({
  login: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required('Required field'),
  password: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required('Required field'),
  password_confirm: yup
    .string()
    .required('Required field')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  name: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required('Required field'),
  gender_id: yup.number().required('Required field'),
  captcha: yup.string().required('Required field')
})

const SignUpForm: React.FC<ISignUpForm> = ({
  onSubmitHandler,
  onRegisterAfterDelay,
  onAdditionalButtonClickHandler
}) => {
  const [popUpMessage, setPopUpMessage] = useState<IPopUpMessage>({
    type: '',
    message: ''
  })

  const {
    control,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignUpData>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
      password_confirm: '',
      // без этого не рендерились элементы селекта (одобрено Андреем Бубновым )
      gender_id: user.genders?.[0]?.id,
      name: '',
      captcha: ''
    }
  })
  const watchPassword = watch('password')
  const watchPasswordConfirm = watch('password_confirm')

  useEffect(() => {
    user.getGenders()
  }, [])

  useEffect(() => {
    if (user.isRegistered) {
      setPopUpMessage({
        type: 'success',
        message: 'User successfully registered! \n Redirecting to login page...'
      })
      setTimeout(() => {
        setPopUpMessage({
          type: '',
          message: ''
        })
        onRegisterAfterDelay && onRegisterAfterDelay()
      }, POP_UP_LIFETIME)
    }
  }, [user.isRegistered])

  useEffect(() => {
    if (user.error?.type === 'captcha') {
      setError('captcha', {
        type: 'manual',
        message: user.error.message
      })
    }

    if (user.error?.type === 'gender_id') {
      setError('gender_id', {
        type: 'manual',
        message: user.error.message
      })
    }

    if (RegisterInputFields.some((input) => input.type === user.error.type)) {
      setError(user.error.type as ITextInputNames, {
        type: 'manual',
        message: user.error.message
      })
    }

    if (user.error.type === 'general') {
      setPopUpMessage({
        type: 'error',
        message: user.error.message
      })

      setTimeout(() => {
        setPopUpMessage({
          type: '',
          message: ''
        })
      }, POP_UP_LIFETIME)
    }
  }, [user.error])

  useEffect(() => {
    if (errors.password_confirm && watchPassword === watchPasswordConfirm) {
      clearErrors('password_confirm')
    }
  }, [watchPassword])

  return (
    <>
      <PopUp
        onCloseHandler={() => {
          setPopUpMessage({ type: '', message: '' })
        }}
        popUpText={popUpMessage.message}
        isSuccessMessage={popUpMessage.type === 'success'}
        isErrorMessage={popUpMessage.type === 'error'}
      />
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
          {/* FIXME: fix required. in case of defaultValue there is always some value */}
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
                  user.resetErrors()
                }}
                name={name}
                innerRef={ref}
              />
            )}
          />
        </div>
        <div className="sign-up-form__item">
          <Controller
            name="captcha"
            control={control}
            render={({ field: { onBlur, onChange, name, ref } }) => (
              <Captcha
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e)
                  user.resetErrors()
                }}
                name={name}
                innerRef={ref}
                errorText={user.error?.type === 'captcha' ? user.error.message : errors.captcha?.message}
              />
            )}
          />
        </div>
        <div className="form-buttons">
          <div className="sign-up-form__button">
            <Button isMainButton type="submit" buttonText="Sign Up" />
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
