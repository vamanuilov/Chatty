import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { IFormInputs, IInput } from '../../../interface/input'

import './styles.scss'

const TextInputAtom = React.forwardRef<HTMLInputElement, IInput & ReturnType<UseFormRegister<IFormInputs>>>(
  ({ type, id, placeholder, isRequired, onBlur, onChange, name }, ref) => (
    <input
      className="input-field-atom"
      id={id}
      type={type}
      placeholder={placeholder}
      required={isRequired}
      autoComplete="off"
      ref={ref}
      onBlur={onBlur}
      onChange={onChange}
      name={name}
    />
  )
)

export default TextInputAtom
