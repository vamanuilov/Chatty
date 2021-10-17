import './styles.scss'

type ButtonText = {
  buttonText: string
  type?: 'submit'
  isDisabled?: boolean
}

const Button: React.FC<ButtonText> = ({ type, buttonText, isDisabled }) => {
  return (
    <button className="a__button" type={type || 'button'} disabled={isDisabled || false}>
      {buttonText}
    </button>
  )
}

export default Button
