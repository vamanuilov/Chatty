import React from 'react'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'

import Image from '../../atoms/Image'
import background from '../../../assets/images/background.png'
import ChatMessages from '../../organisms/ChatMessages'
import Loader from '../../organisms/Loader'

import './styles.scss'

import friendsStore from '../../../store/friends'
import classNames from 'classnames'

const Chat: React.FC = () => {
  const backgroundSize = { height: 'auto', width: '1300px' }

  return (
    <div className={classNames('chat-container', { 'chat-container_hidden': !friendsStore.selectedFriend })}>
      <div className="chat-container__loader">
        <Loader isLoading={friendsStore.isLoading} />
      </div>
      <div className="chat-container__background">
        <Image src={background} altText="background" size={backgroundSize} />
      </div>
      <div className={cn('chat', { chat_loading: friendsStore.isLoading })}>
        <ChatMessages />
      </div>
    </div>
  )
}

export default observer(Chat)
