import './styles.scss'

type TextInputType = {
  type: 'text' | 'login' | 'password'
  id: string
  placeholder: string
  isRequired?: boolean
}

const TextInputAtom: React.FC<TextInputType> = ({ type, id, placeholder, isRequired }) => {
  return (
    <input
      className="a__input-field"
      id={id}
      type={type}
      placeholder={placeholder}
      required={isRequired}
      autoComplete="off"
    />
  )
}

export default TextInputAtom
