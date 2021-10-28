import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import TextInputAtom from '../../atoms/InputField'
import Label from '../../atoms/Label'

import { IFormInputs, IInput } from '../../../interface/input'

import './styles.scss'

export interface IInputField extends IInput {
  label: string
  errorText?: string | undefined
}

const InputFieldBlock = React.forwardRef<HTMLInputElement, IInputField & ReturnType<UseFormRegister<IFormInputs>>>(
  ({ type, id, label, placeholder, errorText, onChange, onBlur, name }, ref) => (
    <div className="input-field-block">
      <Label forId={id} labelText={label} />
      <TextInputAtom
        id={id}
        type={type}
        placeholder={placeholder}
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
      />
      <label className="input-field">{errorText}</label>
    </div>
  )
)

export default React.memo(InputFieldBlock)
