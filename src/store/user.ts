import { makeAutoObservable, runInAction } from 'mobx'

import { convertToUrlEncoded, getErrorMessage } from '../utils'
import { fetchGenders, getCaptcha, registerUser } from '../utils/api'

import { ISignUpData } from '../interface/user'

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
}

export default new User()
