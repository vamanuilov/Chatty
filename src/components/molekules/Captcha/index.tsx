import React from 'react'

import { API_VERSION, HTTP_PORT, URL } from '../../../config'
import { UrlRoutes } from '../../../utils/api'

import Image from '../../atoms/Image'
import FormInput from '../FormInput'

import { IController } from '../../../interface/input'

interface ICaptcha extends IController {
  errorText?: string
}

const Captcha: React.FC<ICaptcha> = ({ onChange, onBlur, name, errorText, innerRef }) => (
  <>
    <Image
      src={`${URL}:${HTTP_PORT}${API_VERSION}${UrlRoutes.CAPTCHA}`}
      altText="Captcha"
      size={{ width: '100px', height: '30px' }}
    />
    <FormInput
      name={name as string}
      innerRef={innerRef}
      onChange={onChange}
      onBlur={onBlur}
      type="text"
      label="Captcha"
      placeholder="Type symbols from image..."
      id="captcha"
      errorText={errorText}
    />
  </>
)

export default Captcha
