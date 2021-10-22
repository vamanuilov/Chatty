import React from 'react'
import cn from 'classnames'

import FriendIcon from '../FriendIcon'

import './styles.scss'

type FriendType = {
  name: string
  lastMessage?: string
  icon: 'male' | 'female'
  isLastMessageFromUser?: boolean
  isSelected?: boolean
}

const Friend: React.FC<FriendType> = ({ name, lastMessage, icon, isLastMessageFromUser, isSelected }) => {
  return (
    <div className={cn('friend', { friend_selected: isSelected })}>
      <div className="friend__icon">
        <FriendIcon icon={icon} />
      </div>
      <div className="friend-info">
        <div className="friend-info__name">{name}</div>
        <div className="friend-info__add-text">
          {isLastMessageFromUser && <span className="friend-info__add-text__span">You:</span>}
          {lastMessage}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Friend)
