export const MIN_INPUT_VALUE: number = 2
export const MAX_INPUT_VALUE: number = 50

export const HTTP_PREFIX: string = 'https://'
export const WS_PREFIX: string = 'ws://'
export const DOMAIN: string = 'server-chatty.herokuapp.com'

export const HTTP_URL = `${HTTP_PREFIX}${DOMAIN}`
export const WS_URI = `${WS_PREFIX}${DOMAIN}/`

export const API_VERSION: string = '/api/'

export const REQUEST_TIMEOUT: number = 15000
export const RETRY_AMOUNT = 3

export const POP_UP_LIFETIME = 2000

export const ID_LENGTH: number = 5

interface IFileLimits {
  size: number
  types: {
    [v: string]: string[]
  }
}

export const FILE_LIMITS: IFileLimits = {
  size: 2,
  types: {
    video: ['video/mp4', 'video/gg', 'video/webm'],
    audio: ['audio/mpeg', 'audio/ogg'],
    image: ['image/jpeg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg+xml']
  }
}
