import Button from '../../atoms/Button'
import InputFieldBlock from '../../molekules/InputFieldBlock'

import './styles.scss'

const LoginForm = () => {
  return (
    <div className="o__login-form">
      <div className="o__login-form__input">
        <InputFieldBlock type="login" placeholder="Input user name..." id="username" label="User name" />
      </div>
      <div className="o__login-form__input">
        <InputFieldBlock type="password" placeholder="Input password..." id="password" label="Password" />
      </div>
      <div className="o__login-form__button">
        <Button buttonText="Log In" />
      </div>
    </div>
  )
}

export default LoginForm
