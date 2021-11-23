import React from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'

import ChatInput from '../ChatInput'
import MessageList from '../MessageList'
import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'
import FriendIcon from '../../molecules/FriendIcon'
import EmptyContentPopup from '../../atoms/EmptyContentPopup'

import { ReactComponent as BackArrow } from '../../../assets/images/arrow.svg'

import { IFriends } from '../../../interface/friends'
import { IFileMessage } from '../../../interface/message'

import './styles.scss'

import { PathEnum } from '../../../routes/endpoints'

interface IChatMessages {
  onMessageSend: (message: string | IFileMessage) => void
  onFileUpload: (file: File) => void
  selectedFriend: IFriends | undefined
}

const ChatMessages: React.FC<IChatMessages> = ({ onMessageSend, onFileUpload, selectedFriend }) => {
  const history = useHistory()

  if (!selectedFriend) {
    return <EmptyContentPopup>Select a chat to start messaging</EmptyContentPopup>
  }

  const { name: friendName, gender, lastTimeOnline, messages } = selectedFriend
  const onBackwardsClickHandler = (): void => {
    history.push(PathEnum.DEFAULT_CHAT)
  }

  return (
    <>
      <div className="chat-header">
        <div
          className={cn('chat-header__backwards-arrow', {
            'chat-header__backwards-arrow_hidden_desktop': selectedFriend
          })}
        >
          <InputWithSvgIcon id="backwards" type="button" onClickHandler={onBackwardsClickHandler}>
            <BackArrow />
          </InputWithSvgIcon>
        </div>
        <div
          className={cn('chat-header__user-icon', {
            'chat-header__user-icon_hidden_desktop': selectedFriend
          })}
        >
          <FriendIcon icon={gender} isHeader />
        </div>
        <div className="chat-header__info">
          <div className="chat-header__name">{friendName}</div>
          <div className="chat-header__last-time">
            {lastTimeOnline?.toLowerCase() !== 'online' ? `Last seen ${lastTimeOnline} ago` : 'Online'}
          </div>
        </div>
      </div>
      <div className="chat-messages">
        <MessageList messages={messages} />
      </div>
      <div>
        <ChatInput onMessageSend={onMessageSend} onFileUpload={onFileUpload} />
      </div>
    </>
  )
}

export default ChatMessages
