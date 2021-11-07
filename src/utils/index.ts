import { REQUEST_TIMEOUT } from '../config'

export const timeoutFunction = (request: Promise<Response>): Promise<Response> => {
  const timeout = new Promise<Response>((resolve) => {
    setTimeout(resolve, REQUEST_TIMEOUT, 'Request timeout')
  })

  return Promise.race<Response>([request, timeout])
}

export const convertToUrlEncoded = <T>(data: T): string =>
  Object.entries(data).reduce((acc, [key, value]) => {
    return acc === '' ? `${key}=${value}` : `${acc}&${key}=${value}`
  }, '')

export const getErrorMessage = (untreadError: string): { type: string; message: string } => {
  if (untreadError.includes('Captcha is wrong')) {
    return {
      type: 'captcha',
      message: 'Captcha is wrong'
    }
  } else if (untreadError.includes('Current login')) {
    return {
      type: 'login',
      message: `Username already used`
    }
  } else if (untreadError.includes('login or password')) {
    return {
      type: 'userData',
      message: 'Invalid username or password'
    }
  } else if (untreadError.includes('Please relogin!')) {
    return {
      type: 'general',
      message: 'Invalid connect key. \n Please, re-login'
    }
  }

  return {
    type: 'general',
    message: `Can't connect to the server. \n Try again`
  }
}
