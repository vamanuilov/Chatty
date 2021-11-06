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
  isLoading: boolean = false
  selectLoading: boolean = false
  captchaLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  resetErrors() {
    this.error = { type: '', message: '' }
  }

  async getCaptcha(parameter: number) {
    this.captchaLoading = true
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
    } finally {
      runInAction(() => {
        this.captchaLoading = false
      })
    }
  }

  async getGenders(): Promise<void> {
    this.selectLoading = true
    try {
      const response = await fetchGenders<IGender[] | string>()

      runInAction(() => {
        if (typeof response === 'string') {
          this.error = {
            type: 'gender_id',
            message: `Can't get genders. \n Try again`
          }
          return
        }

        this.genders = response.genders as IGender[]
      })
    } catch {
      this.error = {
        type: 'general',
        message: `Can't get genders. \n Try again`
      }
    } finally {
      runInAction(() => {
        this.selectLoading = false
      })
    }
  }

  async signUp(data: ISignUpData): Promise<void> {
    this.isLoading = true
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
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  async logIn(data: ILoginData): Promise<void> {
    this.isLoading = true
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
        console.error('Error: ' + errorMessage)
        this.error = {
          type: 'general',
          message: `Can't connect to the server. \n Try again`
        }
      }
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}

export default new User()
