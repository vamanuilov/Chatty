import { makeAutoObservable, runInAction } from 'mobx'

import { convertToUrlEncoded, getErrorMessage } from '../utils'
import { fetchGenders, getCaptcha, registerUser, loginUser } from '../utils/api'

import { ILoginData, ISignUpData } from '../interface/user'

interface IGender {
  id: string
  gender: string
}

interface IError {
  type: string
  message: string
}

class User {
  genders: IGender[] = []
  wsConnectKey: string = localStorage.getItem('wsConnectKey') || ''
  isRegistered: boolean = false
  error: IError = {
    type: '',
    message: ''
  }
  captchaUrl: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  resetErrors() {
    this.error = { type: '', message: '' }
  }

  async getCaptcha(parameter: number) {
    try {
      const response: Blob | string = await getCaptcha(parameter)

      runInAction(() => {
        this.captchaUrl = URL.createObjectURL(response)
      })
    } catch {
      this.error = {
        type: 'captcha',
        message: `Can't load captcha. \n Try again`
      }
    }
  }

  async getGenders(): Promise<void> {
    try {
      const response = await fetchGenders<IGender[] | string>()

      runInAction(() => {
        if (typeof response === 'string') {
          this.error = {
            type: 'gender_id',
            message: `Can't gen genders. \n Try again`
          }
          return
        }

        this.genders = response.genders as IGender[]
      })
    } catch {
      this.error = {
        type: 'gender_id',
        message: `Can't gen genders. \n Try again`
      }
    }
  }

  async signUp(data: ISignUpData): Promise<void> {
    const urlEncodedData: string = convertToUrlEncoded<ISignUpData>(data)

    try {
      const response = await registerUser<boolean>(urlEncodedData)

      runInAction(() => {
        if (typeof response === 'string') {
          this.error = getErrorMessage(response)
          return
        }

        this.isRegistered = typeof response === 'boolean' && response
      })
    } catch {
      this.error = {
        type: 'general',
        message: `Can't connect to the server. \n Try again`
      }
    }
  }

  async logIn(data: ILoginData): Promise<void> {
    const urlEncodedData: string = convertToUrlEncoded<ILoginData>(data)

    try {
      const response = await loginUser(urlEncodedData)

      runInAction(() => {
        this.wsConnectKey = response
        localStorage.setItem('wsConnectKey', response)
      })
    } catch (err) {
      const errorMessage = await err

      if (typeof errorMessage === 'string') {
        this.error = getErrorMessage(errorMessage)
      } else {
        // eslint-disable-next-line no-console
        console.error(errorMessage)
      }
    }
  }
}

export default new User()
