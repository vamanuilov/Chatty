import './styles.scss'

type TextInputType = {
  type: 'text' | 'login' | 'password'
  id: string
  placeholder: string
  isRequired?: boolean
  value: string
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const TextInputAtom: React.FC<TextInputType> = ({
  type,
  id,
  placeholder,
  isRequired,
  className,
  value,
  onChangeHandler
}) => {
  return (
    <input
      onChange={onChangeHandler}
      value={value}
      className={`input-field-atom ${className ? className : ''}`}
      id={id}
      type={type}
      placeholder={placeholder}
      required={isRequired}
      autoComplete="off"
    />
  )
}

export default TextInputAtom
