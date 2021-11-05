import { timeoutFunction } from '.'

import { URL, HTTP_PORT, API_VERSION } from '../config'

const POST_CONTENT_TYPE: string = 'application/x-www-form-urlencoded'

export enum UrlRoutes {
  AUTH = `auth`,
  REGISTER = 'auth/register',
  CAPTCHA = 'auth/captcha'
}

export const getCaptcha = (parameter: number): Promise<Blob> =>
  timeoutFunction(
    fetch(`${URL}:${HTTP_PORT}${API_VERSION}${UrlRoutes.CAPTCHA}?t=${parameter}`, {
      credentials: 'same-origin',
      headers: {
        'Access-Control-Expose-Headers': 'Set-Cookie'
      }
    })
  ).then((res) => {
    return res.blob()
  })

export const fetchGenders = <T>(): Promise<{ genders: T } | string> =>
  timeoutFunction(fetch(`${URL}:${HTTP_PORT}${API_VERSION}${UrlRoutes.AUTH}`)).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return res.text()
  })

export const registerUser = <T>(data: string): Promise<T | string> =>
  timeoutFunction(
    fetch(`${URL}:${HTTP_PORT}${API_VERSION}${UrlRoutes.REGISTER}`, {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': POST_CONTENT_TYPE
      }
    })
  ).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return res.text()
  })
