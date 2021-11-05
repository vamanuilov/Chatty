export interface ISignUpData {
  login: string
  password: string
  password_confirm: string
  name: string
  gender_id: string
  captcha: string
}

export interface ILoginData {
  login: string
  password: string
  captcha: string
}
