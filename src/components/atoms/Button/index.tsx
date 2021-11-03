import React from 'react'
import cn from 'classnames'

import './styles.scss'

type ButtonText = {
  buttonText: string
  type?: 'submit' | 'button'
  isDisabled?: boolean
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isMainButton?: boolean
}

const Button: React.FC<ButtonText> = ({ type = 'button', buttonText, isDisabled, onClickHandler, isMainButton }) => {
  return (
    <button
      className={cn('button-atom', { 'button-atom_main': isMainButton })}
      type={type}
      disabled={isDisabled || false}
      onClick={onClickHandler}
    >
      {buttonText}
    </button>
  )
}

export default React.memo(Button)
