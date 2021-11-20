import { timeoutFunction } from '.'

import { HTTP_URL, API_VERSION } from '../config'

const POST_CONTENT_TYPE: string = 'application/x-www-form-urlencoded'

enum UrlRoutes {
  AUTH = `auth`,
  REGISTER = 'auth/register',
  CAPTCHA = 'auth/captcha',
  LOGIN = 'auth/login',
  UPLOAD = 'upload'
}

export const getCaptcha = (parameter: number): Promise<Blob> => {
  const controller = new AbortController()
  return timeoutFunction(
    fetch(`${HTTP_URL}${API_VERSION}${UrlRoutes.CAPTCHA}?t=${parameter}`, {
      credentials: 'same-origin',
      signal: controller.signal,
      headers: {
        'Access-Control-Expose-Headers': 'Set-Cookie'
      }
    }),
    controller
  ).then((res) => {
    return res.blob()
  })
}
export const fetchGenders = <T>(): Promise<{ genders: T } | string> => {
  const controller = new AbortController()
  return timeoutFunction(
    fetch(`${HTTP_URL}${API_VERSION}${UrlRoutes.AUTH}`, {
      signal: controller.signal
    }),
    controller
  ).then((res) => {
    if (res.ok) {
      return res.json()
    }

    return res.text()
  })
}

export const registerUser = <T>(data: string): Promise<T | string> => {
  const controller = new AbortController()
  return timeoutFunction(
    fetch(`${HTTP_URL}${API_VERSION}${UrlRoutes.REGISTER}`, {
      method: 'POST',
      body: data,
      signal: controller.signal,
      credentials: 'same-origin',
      headers: {
        'Content-Type': POST_CONTENT_TYPE
      }
    }),
    controller
  ).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return res.text()
  })
}

export const loginUser = (data: string): Promise<string> => {
  const controller = new AbortController()
  return timeoutFunction(
    fetch(`${HTTP_URL}${API_VERSION}${UrlRoutes.LOGIN}`, {
      method: 'POST',
      body: data,
      signal: controller.signal,
      credentials: 'same-origin',
      headers: {
        'Content-Type': POST_CONTENT_TYPE
      }
    }),
    controller
  )
    .then((res) => {
      if (res.ok) {
        return { ok: res.ok, body: res.json() }
      }
      return { ok: res.ok, body: res.text() }
    })
    .then(({ ok, body }) => {
      if (ok) {
        return body
      }

      return Promise.reject(body)
    })
}

export const uploadFile = (file: FormData): Promise<string> => {
  const controller = new AbortController()
  return timeoutFunction(
    fetch(`${HTTP_URL}${API_VERSION}${UrlRoutes.UPLOAD}`, {
      method: 'POST',
      body: file,
      signal: controller.signal,
      credentials: 'same-origin'
    }),
    controller
  ).then((res) => {
    return res.text()
  })
}
