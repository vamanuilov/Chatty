import { RefCallBack } from 'react-hook-form'

export interface IController {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  name?: string
  innerRef?: RefCallBack
}

export interface IInput extends IController {
  type: 'text' | 'login' | 'password'
  id: string
  placeholder: string
  isRequired?: boolean
}
