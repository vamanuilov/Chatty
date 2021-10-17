import './styles.scss'

type TextInputType = {
  type: 'text' | 'login' | 'password'
  id: string
  placeholder: string
}

const TextInputAtom: React.FC<TextInputType> = ({ type, id, placeholder }) => {
  return <input className="a__input-field" id={id} type={type} placeholder={placeholder} autoComplete="off" />
}

export default TextInputAtom
