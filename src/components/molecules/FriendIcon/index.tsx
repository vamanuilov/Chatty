import React from 'react'
import cn from 'classnames'

import Image from '../../atoms/Image'

import male from '../../../assets/images/maleUser.png'
import female from '../../../assets/images/femaleUser.png'

type FriendIconType = {
  icon: 'male' | 'female'
  isHeader?: boolean
}

import './styles.scss'

const FriendIcon: React.FC<FriendIconType> = ({ icon, isHeader }) => {
  const iconSrc = icon === 'male' ? male : female

  return (
    <div className={cn('friend-icon', { 'friend-icon_chat-header': isHeader })}>
      <Image src={iconSrc} altText={`friend ${icon} avatar`} size={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default React.memo(FriendIcon)
