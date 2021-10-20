import React from 'react'

import Avatar from '../../molekules/Avatar'
import Logo from '../../molekules/Logo'

import avatar from '../../../assets/images/avatar.png'

import './styles.scss'

const Header = () => {
  return (
    <div className="header">
      <Logo className="header__logo" />
      <Avatar src={avatar} className="header__avatar" />
    </div>
  )
}

export default React.memo(Header)
