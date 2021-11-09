import React from 'react'
import cn from 'classnames'

import Logo from '../../molecules/Logo'
import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'

import { ReactComponent as AvatarIcon } from '../../../assets/images/avatar.svg'
import { ReactComponent as LogOutIcon } from '../../../assets/images/logout.svg'

import './styles.scss'

interface IHeader {
  onLogOutHandler: () => void
  isHidden: boolean
}

const Header: React.FC<IHeader> = ({ onLogOutHandler, isHidden }) => {
  return (
    <div className={cn('header', { header_hidden: isHidden })}>
      <Logo className="header__logo" />
      <div className="user">
        <div className="user-logout">
          <InputWithSvgIcon id="logout" type="button" onClickHandler={onLogOutHandler}>
            <LogOutIcon className="user-logout__icon" />
          </InputWithSvgIcon>
        </div>
        <div className="user-avatar">
          <InputWithSvgIcon id="avatar" type="button">
            <AvatarIcon className="user-avatar__icon" />
          </InputWithSvgIcon>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header)
