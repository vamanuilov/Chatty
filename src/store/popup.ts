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
  timer: NodeJS.Timeout | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setMessage({ type, text }: IPopUp): void {
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }

    this.message = {
      type,
      text
    }

    this.timer = setTimeout(() => {
      this.resetMessage()
      this.timer = null
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
