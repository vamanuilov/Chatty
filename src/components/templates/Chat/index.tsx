import React from 'react'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'

import { ReactComponent as BackgroundImg } from '../../../assets/images/Background.svg'
import ChatMessages from '../../organisms/ChatMessages'
import Loader from '../../atoms/Loader'

import './styles.scss'

import chat from '../../../store/chat'

const Chat: React.FC = () => {
  return (
    <div className={cn('chat-container', { 'chat-container_hidden': !chat.selectedFriend })}>
      <div className="chat-container__loader">
        <Loader isLoading={chat.isLoading} />
      </div>
      <div className="chat-container__background">
        <BackgroundImg className="chat-container__img" />
      </div>
      <div className={cn('chat', { chat_loading: chat.isLoading })}>
        <ChatMessages />
      </div>
    </div>
  )
}

export default observer(Chat)
