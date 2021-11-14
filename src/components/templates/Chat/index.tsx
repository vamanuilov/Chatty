import React from 'react'
import cn from 'classnames'

import { ReactComponent as BackgroundImg } from '../../../assets/images/Background.svg'

import ChatMessages from '../../organisms/ChatMessages'
import Loader from '../../atoms/Loader'

import './styles.scss'

interface IChat {
  isFriendNotSelected: boolean
  isLoading: boolean
}

const Chat: React.FC<IChat> = ({ isFriendNotSelected, isLoading }) => {
  return (
    <div className={cn('chat-container', { 'chat-container_hidden': isFriendNotSelected })}>
      <div className="chat-container__loader">
        <Loader isLoading={isLoading} />
      </div>
      <div className="chat-container__background">
        <BackgroundImg className="chat-container__img" />
      </div>
      <div className={cn('chat', { chat_loading: isLoading })}>
        <ChatMessages />
      </div>
    </div>
  )
}

export default React.memo(Chat)
