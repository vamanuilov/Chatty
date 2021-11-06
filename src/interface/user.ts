export interface ISignUpData {
  login: string
  password: string
  password_confirm: string
  name: string
  gender_id: number
  captcha: string
}

export interface ILoginData {
  login: string
  password: string
  captcha: string
}
