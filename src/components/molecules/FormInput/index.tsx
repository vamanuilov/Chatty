import React from 'react'
import cn from 'classnames'

import TextInputAtom from '../../atoms/InputField'
import Label from '../../atoms/Label'

import { IInput } from '../../../interface/input'

import './styles.scss'

export interface IInputField extends IInput {
  label: string
  errorText?: string | undefined
}

const FormInput: React.FC<IInputField> = ({
  type,
  id,
  label,
  placeholder,
  errorText,
  onChange,
  onBlur,
  name,
  innerRef
}) => (
  <div className={cn('input-field-block', { 'input-field-block_error': errorText })}>
    <Label forId={id} labelText={label} />
    <TextInputAtom
      id={id}
      type={type}
      placeholder={placeholder}
      innerRef={innerRef}
      onBlur={onBlur}
      onChange={onChange}
      name={name}
    />
    <label className="input-field-block__error-label">{errorText}</label>
  </div>
)

export default React.memo(FormInput)
