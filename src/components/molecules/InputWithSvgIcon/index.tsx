import React from 'react'

import SvgIconLabel from '../../atoms/SvgIconLabel'

import './styles.scss'

interface IInputWithSvgIcon {
  id: string
  type: 'file' | 'button'
  onClickHandler?: (e: React.MouseEvent<HTMLInputElement>) => void
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
  elemRef?: React.LegacyRef<HTMLInputElement>
}

const InputWithSvgIcon: React.FC<IInputWithSvgIcon> = ({
  elemRef,
  children,
  id,
  type,
  onClickHandler,
  onChangeHandler
}) => {
  return (
    <div className="input-with-svg-icon">
      <SvgIconLabel htmlForId={id}>{children}</SvgIconLabel>
      <input
        ref={elemRef}
        className="input-with-svg-icon__input_hidden"
        id={id}
        type={type}
        onChange={onChangeHandler}
        onClick={onClickHandler}
      ></input>
    </div>
  )
}

export default React.memo(InputWithSvgIcon)
