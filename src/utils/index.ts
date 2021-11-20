import { REQUEST_TIMEOUT } from '../config'

export const timeoutFunction = (request: Promise<Response>, controller: AbortController): Promise<Response> => {
  const timeout = new Promise<Response>((resolve) => {
    setTimeout(
      () => {
        controller?.abort()
        resolve
      },
      REQUEST_TIMEOUT,
      'Request timeout'
    )
  })

  return Promise.race<Response>([request, timeout])
}

export const convertToUrlEncoded = <T>(data: T): string =>
  Object.entries(data).reduce((acc, [key, value]) => {
    return acc === '' ? `${key}=${value}` : `${acc}&${key}=${value}`
  }, '')

export const convertToFormData = (data: { [v: string]: any }): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, String(value))
    }
  })

  return formData
}

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

export const convertByteToMByte = (bytes: number): number => bytes / 1024 / 1024
