import LoginForm from '../../organisms/LoginForm'
import Image from '../../atoms/Image'
import Heading from '../../atoms/Heading'

import background from '../../../assets/images/background.png'
import './style.scss'
import Logo from '../../organisms/Logo'

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-page__img">
        <Image src={background} altText="background" size={{ height: 'auto', width: '1300px' }} />
      </div>
      <div className="login-page__form">
        <div className="form-content">
          <Logo />
          <Heading element="h1">
            Welcome to <span className="form-content__span_plain-text">Chatty</span>
            <span className="form-content__span_exc-mark">!</span>
          </Heading>
          <Heading element="h2">Please, authorize yourself</Heading>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
