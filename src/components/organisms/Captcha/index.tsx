import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { UseFormClearErrors } from 'react-hook-form'

import Image from '../../atoms/Image'
import FormInput from '../../molecules/FormInput'
import StubInput from '../../molecules/StubInput'
import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'

import { ReactComponent as RefreshIcon } from '../../../assets/images/refresh-icon.svg'

import { IController } from '../../../interface/input'

import './styles.scss'

import user from '../../../store/user'

interface ICaptcha extends IController {
  errorText?: string
  resetError?: UseFormClearErrors<{ captcha: string }>
}

interface IRefreshButton {
  onClickHandler: () => void
}

// i'm not going to use it in any other component, so decide to stick it in here
const RefreshButton: React.FC<IRefreshButton> = ({ onClickHandler }) => (
  <div className="captcha__refresh">
    <InputWithSvgIcon id="refresh-captcha" type="button" onClickHandler={onClickHandler}>
      <RefreshIcon className="refresh_active" width="15px" height="15px" />
    </InputWithSvgIcon>
  </div>
)

const Captcha: React.FC<ICaptcha> = ({ onChange, onBlur, name, errorText, innerRef, resetError }) => {
  const [parameter, setParameter] = useState<number>(Date.now())

  const onRefreshHandler = (): void => {
    resetError && resetError('captcha')
    user.resetErrors()
    setParameter(Date.now())
  }

  useEffect(() => {
    user.getCaptcha(parameter)
  }, [parameter])

  return (
    <div className="captcha">
      <div className="captcha__input">
        <FormInput
          name={name}
          innerRef={innerRef}
          onChange={(e) => {
            onChange && onChange(e)
            if (user.error.type === 'captcha') {
              user.resetErrors()
            }
          }}
          onBlur={onBlur}
          type="text"
          label="Security code"
          placeholder="Security code"
          id="captcha"
          errorText={errorText}
        />
      </div>

      {user.captchaUrl === '' ? (
        <div className="captcha__stub">
          <StubInput labelText="" isLoading={user.captchaLoading} />
          <RefreshButton onClickHandler={onRefreshHandler} />
        </div>
      ) : (
        <div className="captcha__img">
          <Image src={user.captchaUrl} altText="Captcha" size={{ width: '100px', height: '30px' }} />
          <RefreshButton onClickHandler={onRefreshHandler} />
        </div>
      )}
    </div>
  )
}

export default observer(Captcha)
