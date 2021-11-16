export type ITextInputNames = 'login' | 'password' | 'password_confirm' | 'name'

interface ITextInput {
  inputName: ITextInputNames
  type: 'text' | 'login' | 'password'
  label: string
  placeholder: string
  id: string
}

export const RegisterInputFields: ITextInput[] = [
  {
    inputName: 'login',
    type: 'login',
    label: 'Create user name',
    placeholder: 'Create user name',
    id: 'login'
  },
  {
    inputName: 'password',
    type: 'password',
    label: 'Create password',
    placeholder: 'Create password',
    id: 'password'
  },
  {
    inputName: 'password_confirm',
    type: 'password',
    label: 'Password confirmation',
    placeholder: 'Confirm password',
    id: 'password_confirm'
  },
  {
    inputName: 'name',
    type: 'text',
    label: 'Nickname',
    placeholder: 'Nickname',
    id: 'name'
  }
]
