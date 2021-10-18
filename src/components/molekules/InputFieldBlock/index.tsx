import TextInputAtom from '../../atoms/InputField'
import Label from '../../atoms/Label'

import './styles.scss'

type InputFieldType = {
  type: 'text' | 'login' | 'password'
  id: string
  label: string
  placeholder: string
  isRequired: boolean
}

const InputFieldBlock: React.FC<InputFieldType> = ({ type, id, label, placeholder, isRequired }) => {
  return (
    <div className="m__input-block">
      <Label forId={id} labelText={label} />
      <TextInputAtom type={type} id={id} placeholder={placeholder} isRequired={isRequired} />
    </div>
  )
}

export default InputFieldBlock
