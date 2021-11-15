import { useState } from 'react'
import cn from 'classnames'

import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'

import { ReactComponent as RefreshIcon } from '../../../assets/images/refresh-icon.svg'

import './styles.scss'

interface IRefreshButton {
  onClickHandler: () => void
}

const RefreshButton: React.FC<IRefreshButton> = ({ onClickHandler }) => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false)

  return (
    <div
      className={cn('refresh-button', { 'refresh-button_animated': isAnimated })}
      onClick={() => setIsAnimated(true)}
      onTransitionEnd={() => setIsAnimated(false)}
    >
      <InputWithSvgIcon id="refresh-captcha" type="button" onClickHandler={onClickHandler}>
        <RefreshIcon width="15px" height="15px" />
      </InputWithSvgIcon>
    </div>
  )
}

export default RefreshButton
