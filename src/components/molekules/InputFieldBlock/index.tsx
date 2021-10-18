import React from 'react'
import TextInputAtom from '../../atoms/InputField'
import Label from '../../atoms/Label'

import './styles.scss'

type InputFieldType = {
  type: 'text' | 'login' | 'password'
  value: string
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  label: string
  placeholder: string
  isRequired: boolean
}

const InputFieldBlock: React.FC<InputFieldType> = ({
  type,
  id,
  label,
  placeholder,
  isRequired,
  value,
  onChangeHandler
}) => {
  return (
    <div className="m__input-block">
      <Label forId={id} labelText={label} />
      <TextInputAtom
        value={value}
        onChangeHandler={onChangeHandler}
        type={type}
        id={id}
        placeholder={placeholder}
        isRequired={isRequired}
      />
    </div>
  )
}

export default React.memo(InputFieldBlock)
