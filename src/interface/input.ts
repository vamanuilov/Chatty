export interface IInput {
  type: 'text' | 'login' | 'password'
  id: string
  placeholder: string
  isRequired?: boolean
  name?: string
}

export interface IFormInputs {
  login: string
  password: string
}
