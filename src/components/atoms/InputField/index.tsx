import React from 'react'
import './styles.scss'

type TextInputType = {
  type: 'text' | 'login' | 'password'
  id: string
  placeholder: string
  isRequired?: boolean
  value: string
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInputAtom: React.FC<TextInputType> = ({ type, id, placeholder, isRequired, value, onChangeHandler }) => {
  return (
    <input
      onChange={onChangeHandler}
      value={value}
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
