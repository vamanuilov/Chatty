import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import Image from '../../atoms/Image'
import FormInput from '../FormInput'
import InputWithSvgIcon from '../InputWithSvgIcon'

import { ReactComponent as RefreshIcon } from '../../../assets/images/refresh-icon.svg'

import { IController } from '../../../interface/input'

import './styles.scss'

import user from '../../../store/user'

interface ICaptcha extends IController {
  errorText?: string
}

const Captcha: React.FC<ICaptcha> = ({ onChange, onBlur, name, errorText, innerRef }) => {
  const [parameter, setParameter] = useState<number>(Date.now())

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
      <div className="captcha__img">
        <Image src={user.captchaUrl} altText="Captcha" size={{ width: '100px', height: '30px' }} />
        <div className="captcha__refresh">
          <InputWithSvgIcon id="refresh-captcha" type="button" onClickHandler={() => setParameter(Date.now())}>
            <RefreshIcon width="15px" height="15px" />
          </InputWithSvgIcon>
        </div>
      </div>
    </div>
  )
}

export default observer(Captcha)
