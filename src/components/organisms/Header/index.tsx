import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import Avatar from '../../molecules/Avatar'
import Logo from '../../molecules/Logo'

import avatar from '../../../assets/images/avatar.png'

import './styles.scss'

import friendsStore from '../../../store/friends'

const Header = () => {
  return (
    <div className={cn('header', { header_hidden: friendsStore.selectedFriend })}>
      <Logo className="header__logo" />
      <Avatar src={avatar} className="header__avatar" />
    </div>
  )
}

export default observer(Header)
