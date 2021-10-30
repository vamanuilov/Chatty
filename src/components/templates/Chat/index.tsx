import React from 'react'

import Image from '../../atoms/Image'
import background from '../../../assets/images/background.png'
import ChatMessages from '../../organisms/ChatMessages'

import './styles.scss'

const Chat: React.FC = () => {
  const backgroundSize = { height: 'auto', width: '1300px' }

  return (
    <div className="chat">
      <div className="chat__background">
        <Image src={background} altText="background" size={backgroundSize} />
      </div>
      <ChatMessages />
    </div>
  )
}

export default Chat
