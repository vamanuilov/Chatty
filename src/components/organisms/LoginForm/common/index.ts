interface ILoginInputs {
  inputName: 'login' | 'password'
  type: 'login' | 'password' | 'text'
  label: string
  placeholder: string
  id: string
}

export const LogInInputFields: ILoginInputs[] = [
  {
    inputName: 'login',
    type: 'login',
    label: 'Username',
    placeholder: 'Type your username...',
    id: 'login'
  },
  {
    inputName: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Type your password...',
    id: 'password'
  }
]
