import React from 'react'

import './styles.scss'

type ButtonText = {
  buttonText: string
  type?: 'submit'
  isDisabled?: boolean
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonText> = ({ type, buttonText, isDisabled, onClickHandler }) => {
  return (
    <button className="button-atom" type={type || 'button'} disabled={isDisabled || false} onClick={onClickHandler}>
      {buttonText}
    </button>
  )
}

export default React.memo(Button)
