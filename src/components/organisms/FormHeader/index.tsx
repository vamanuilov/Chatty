import Heading from '../../atoms/Heading'
import Logo from '../../molekules/Logo'

import './styles.scss'

interface IFormHeader {
  mainText: string
  additionalText: string
}

const FormHeader: React.FC<IFormHeader> = ({ mainText, additionalText }) => {
  return (
    <div className="form-header">
      <Logo className="form-header__logo" />
      <div className="main-text">
        <Heading element="h1">
          {mainText} to <span className="main-text__span">Chatty</span>
          <span className="main-text__exc-mark">!</span>
        </Heading>
      </div>
      <span className="form-header__additional-text">
        <Heading element="h2">{additionalText}</Heading>
      </span>
    </div>
  )
}

export default FormHeader
