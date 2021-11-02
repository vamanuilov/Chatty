import { ChangeHandler } from 'react-hook-form'

export interface IInput {
  type: 'text' | 'login' | 'password'
  id: string
  placeholder: string
  isRequired?: boolean
  name?: string
  onBlur?: ChangeHandler
  onChange?: ChangeHandler
  innerRef?: React.ForwardedRef<HTMLInputElement>
}

export interface IFormInputs {
  login: string
  password: string
}
