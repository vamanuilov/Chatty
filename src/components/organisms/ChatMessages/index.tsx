import React from 'react'
import { observer } from 'mobx-react-lite'

import ChatInput from '../../molekules/ChatInput'
import MessageList from '../../molekules/MessageList'
import EmptyContentPopup from '../../atoms/EmptyContentPopup'

import { IFriends } from '../../../interface/friends'

import './styles.scss'

import friendsStore from '../../../store/friends'

const ChatMessages: React.FC = () => {
  if (!friendsStore.selectedFriend) {
    return <EmptyContentPopup>Select a chat to start messaging</EmptyContentPopup>
  }

  const { name: friendName, lastTimeOnline } = friendsStore.selectedFriend as IFriends

  return (
    <>
      <div className="chat-header">
        <div className="chat-header__name">{friendName}</div>
        <div className="chat-header__last-time">
          {lastTimeOnline?.toLowerCase() !== 'online' ? `Last seen ${lastTimeOnline} ago` : 'Online'}
        </div>
      </div>
      <div className="chat-messages">
        <MessageList />
      </div>
      <div className="chat-input-container">
        <ChatInput />
      </div>
    </>
  )
}

export default observer(ChatMessages)
