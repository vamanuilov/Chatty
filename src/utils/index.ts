import { REQUEST_TIMEOUT } from '../config'

import { controller } from './api'

export const timeoutFunction = (request: Promise<Response>): Promise<Response> => {
  const timeout = new Promise<Response>((resolve) => {
    setTimeout(
      () => {
        controller.abort()
        resolve
      },
      REQUEST_TIMEOUT,
      'Request timeout'
    )
  })

  return Promise.race<Response>([request, timeout])
}
