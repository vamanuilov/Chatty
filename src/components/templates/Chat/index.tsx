import React from 'react'

import Image from '../../atoms/Image'
import background from '../../../assets/images/background.png'
import ChatMessages from '../../organisms/ChatMessages'

import { IChat } from '../../../interface/chat'

import './styles.scss'

const Chat: React.FC<IChat> = ({ setMessages, selectedFriend, messages }) => {
  const backgroundSize = { height: 'auto', width: '1300px' }

  return (
    <div className="chat">
      <div className="chat__background">
        <Image src={background} altText="background" size={backgroundSize} />
      </div>
      <ChatMessages messages={messages} setMessages={setMessages} selectedFriend={selectedFriend} />
    </div>
  )
}

export default Chat
