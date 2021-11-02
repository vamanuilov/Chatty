import React from 'react'
// import { UseFormRegister } from 'react-hook-form'
import { IInput } from '../../../interface/input'

import './styles.scss'

const TextInputAtom: React.FC<IInput> = ({ type, id, placeholder, isRequired, onBlur, onChange, name, innerRef }) => (
  <input
    className="input-field-atom"
    id={id}
    type={type}
    placeholder={placeholder}
    required={isRequired}
    autoComplete="off"
    ref={innerRef}
    onBlur={onBlur}
    onChange={onChange}
    name={name}
  />
)

export default TextInputAtom
