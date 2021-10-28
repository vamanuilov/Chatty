import { useHistory } from 'react-router'

import Image from '../../atoms/Image'
import Heading from '../../atoms/Heading'
import Logo from '../../molekules/Logo'
import LoginForm from '../../organisms/LoginForm'

import background from '../../../assets/images/background.png'

import './styles.scss'

const LoginPage: React.FC = () => {
  const history = useHistory()
  const backgroundSize = { height: 'auto', width: '1300px' }

  const onSubmitHandler = () => {
    history.push('/messages')
  }
  return (
    <div className="login-page">
      <div className="login-page__img">
        <Image src={background} altText="background" size={backgroundSize} />
      </div>
      <div className="login-page__form">
        <div className="form-content">
          <Logo className="form-content__logo" />
          <Heading element="h1">
            Welcome to <span className="form-content__span_plain-text">Chatty</span>
            <span className="form-content__span_exc-mark">!</span>
          </Heading>
          <Heading element="h2">Please, authorize yourself</Heading>
        </div>

        <LoginForm onSubmitHandler={onSubmitHandler} />
      </div>
    </div>
  )
}

export default LoginPage
