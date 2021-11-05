import React from 'react'
import cn from 'classnames'

import InputWithSvgIcon from '../../molekules/InputWithSvgIcon'

import { ReactComponent as CloseIcon } from '../../../assets/images/icon_close.svg'

import './styles.scss'

interface IPopUp {
  popUpText: string
  isSuccessMessage?: boolean
  isErrorMessage?: boolean
  onCloseHandler: () => void
}

const PopUp: React.FC<IPopUp> = ({ popUpText, onCloseHandler, isSuccessMessage, isErrorMessage }) => {
  return (
    <div className={cn('pop-up-container', { 'pop-up-container_show': popUpText })}>
      <div className={cn('pop-up', { 'pop-up_success': isSuccessMessage, 'pop-up_error': isErrorMessage })}>
        <div className="pop-up__text">{popUpText}</div>
        <div className="close-icon-container">
          <InputWithSvgIcon type="button" id="closeIcon" onClickHandler={onCloseHandler}>
            <CloseIcon className="close-icon-container__svg" />
          </InputWithSvgIcon>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PopUp)
