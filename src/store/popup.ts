import { makeAutoObservable } from 'mobx'

import { POP_UP_LIFETIME } from '../config'

interface IPopUp {
  type: 'error' | 'success' | ''
  text: string
}

class PopUp {
  message: IPopUp = {
    type: '',
    text: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  setMessage = ({ type, text }: IPopUp): void => {
    this.message = {
      type,
      text
    }

    setTimeout(() => {
      this.resetMessage()
    }, POP_UP_LIFETIME)
  }

  resetMessage = (): void => {
    this.message = {
      type: '',
      text: ''
    }
  }
}

export default new PopUp()
