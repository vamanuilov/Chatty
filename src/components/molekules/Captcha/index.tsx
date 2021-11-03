import React, { useState } from 'react'

import { API_VERSION, HTTP_PORT, URL } from '../../../config'
import { UrlRoutes } from '../../../utils/api'

import Image from '../../atoms/Image'
import FormInput from '../FormInput'
import InputWithSvgIcon from '../InputWithSvgIcon'

import { ReactComponent as RefreshIcon } from '../../../assets/images/refresh-icon.svg'

import { IController } from '../../../interface/input'

import './styles.scss'

interface ICaptcha extends IController {
  errorText?: string
}

const Captcha: React.FC<ICaptcha> = ({ onChange, onBlur, name, errorText, innerRef }) => {
  const [parameter, setParameter] = useState<number>(Date.now())
  return (
    <div className="captcha">
      <div className="captcha__img">
        <Image
          src={`${URL}:${HTTP_PORT}${API_VERSION}${UrlRoutes.CAPTCHA}?t${parameter}`}
          altText="Captcha"
          size={{ width: '100px', height: '30px' }}
        />

        <div className="captcha__refresh">
          <InputWithSvgIcon id="refresh-captcha" type="button" onClickHandler={() => setParameter(Date.now())}>
            <RefreshIcon width="15px" height="15px" />
          </InputWithSvgIcon>
        </div>
      </div>
      <div className="captcha__input">
        <FormInput
          name={name as string}
          innerRef={innerRef}
          onChange={onChange}
          onBlur={onBlur}
          type="text"
          label="Captcha"
          placeholder="Type captcha..."
          id="captcha"
          errorText={errorText}
        />
      </div>
    </div>
  )
}

export default Captcha
