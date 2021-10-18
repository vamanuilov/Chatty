import Button from '../../atoms/Button'
import InputFieldBlock from '../../molekules/InputFieldBlock'

import './styles.scss'

const LoginForm = () => {
  return (
    <form
      className="o__login-form"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div className="o__login-form__input">
        <InputFieldBlock
          type="login"
          placeholder="Input user name..."
          id="username"
          label="User name"
          isRequired={true}
        />
      </div>
      <div className="o__login-form__input">
        <InputFieldBlock
          type="password"
          placeholder="Input password..."
          id="password"
          label="Password"
          isRequired={true}
        />
      </div>
      <div className="o__login-form__button">
        <Button type="submit" buttonText="Log In" />
      </div>
    </form>
  )
}

export default LoginForm
