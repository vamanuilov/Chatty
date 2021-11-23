import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { UseFormClearErrors } from 'react-hook-form'

import Image from '../../atoms/Image'
import FormInput from '../../molecules/FormInput'
import StubInput from '../../molecules/StubInput'
import RefreshButton from '../RefreshButton'

import { IController } from '../../../interface/input'

import './styles.scss'

import user from '../../../store/user'

interface ICaptchaBlock extends IController {
  errorText?: string
  resetError?: UseFormClearErrors<{ captcha: string }>
}

const CaptchaBlock: React.FC<ICaptchaBlock> = ({ onChange, onBlur, name, errorText, innerRef, resetError }) => {
  const [parameter, setParameter] = useState<number>(Date.now())

  const onRefreshHandler = (): void => {
    resetError && resetError('captcha')
    user.resetErrors()
    setParameter(Date.now())
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    if (user.error.type === 'captcha') {
      user.resetErrors()
    }
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
          onChange={onChangeHandler}
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
          <div className="captcha__refresh">
            <RefreshButton onClickHandler={onRefreshHandler} />
          </div>
        </div>
      ) : (
        <div className="captcha__img">
          <Image src={user.captchaUrl} altText="Captcha" size={{ width: '100px', height: '30px' }} />
          <div className="captcha__refresh">
            <RefreshButton onClickHandler={onRefreshHandler} />
          </div>
        </div>
      )}
    </div>
  )
}

export default observer(CaptchaBlock)
