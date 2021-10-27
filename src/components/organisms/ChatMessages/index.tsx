import React from 'react'
import ChatInput from '../../molekules/ChatInput'

import { ISelectedFriend } from '../../../interface/friends'
import { IChat } from '../../../interface/chat'

import './styles.scss'
import MessageList from '../../molekules/MessageList'
import EmptyContentPopup from '../../atoms/EmptyContentPopup'

const ChatMessages: React.FC<IChat> = ({ setMessages, selectedFriend, messages }) => {
  if (!selectedFriend) {
    return <EmptyContentPopup>Select a chat to start messaging</EmptyContentPopup>
  }

  const { name: friendName, lastTimeOnline } = selectedFriend as ISelectedFriend

  return (
    <>
      <div className="chat-header">
        <div className="chat-header__name">{friendName}</div>
        <div className="chat-header__last-time">
          {lastTimeOnline?.toLowerCase() !== 'online' ? `Last seen ${lastTimeOnline} ago` : 'Online'}
        </div>
      </div>
      <div className="chat-messages">
        <MessageList messages={messages} />
      </div>
      <div className="chat-input-container">
        <ChatInput setMessages={setMessages} />
      </div>
    </>
  )
}

export default React.memo(ChatMessages)
