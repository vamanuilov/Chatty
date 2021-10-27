import React from 'react'
import cn from 'classnames'

import { IFriend } from '../../../interface/friends'

import { ReactComponent as FileIcon } from '../../../assets/images/fileIcon.svg'

import FriendIcon from '../FriendIcon'

import './styles.scss'

const Friend: React.FC<IFriend> = ({ name, lastMessage, icon, isLastMessageFromUser, isSelected }) => {
  return (
    <div className={cn('friend', { friend_selected: isSelected })}>
      <div className="friend__icon">
        <FriendIcon icon={icon} />
      </div>
      <div className="friend-info">
        <div className="friend-info__name">{name}</div>
        <div className="friend-info__add-text">
          {isLastMessageFromUser && <span className="friend-info__span">You:</span>}
          {lastMessage === 'File' && <FileIcon className="friend-info__file-icon" />}
          {lastMessage}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Friend)
