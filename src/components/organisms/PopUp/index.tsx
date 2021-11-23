import React from 'react'
import cn from 'classnames'

import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'

import popup from '../../../store/popup'

import { ReactComponent as CloseIcon } from '../../../assets/images/icon_close.svg'

import './styles.scss'
import { observer } from 'mobx-react-lite'

const PopUp: React.FC = () => {
  const onCloseClickHandler = (): void => {
    popup.resetMessage()
  }

  return (
    <div className={cn('pop-up-container', { 'pop-up-container_show': popup.message.text })}>
      <div
        className={cn('pop-up', {
          'pop-up_success': popup.message.type === 'success',
          'pop-up_error': popup.message.type === 'error'
        })}
      >
        <div className="pop-up__text">{popup.message.text}</div>
        <div className="close-icon-container">
          <InputWithSvgIcon type="button" id="closeIcon" onClickHandler={onCloseClickHandler}>
            <CloseIcon className="close-icon-container__svg" />
          </InputWithSvgIcon>
        </div>
      </div>
    </div>
  )
}

export default observer(PopUp)
