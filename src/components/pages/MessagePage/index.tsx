import { useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'

import Sidebar from '../../organisms/Sidebar'
import Header from '../../organisms/Header'
import FriendList from '../../organisms/FriendList'
import Chat from '../../templates/Chat'
import PopUp from '../../organisms/PopUp'

import chat from '../../../store/chat'
import user from '../../../store/user'
import socket from '../../../store/socket'

import './styles.scss'

const MessagePage: React.FC = () => {
  const { id: selectedId } = useParams<{ [v: string]: string }>()
  const history = useHistory()

  useEffect(() => {
    socket.connect(user.wsConnectKey)

    return () => {
      socket.closeConnection()
    }
  }, [user.wsConnectKey])

  useEffect(() => {
    chat.setSelectedFriend(selectedId)
  }, [selectedId])

  const handleSelectFriend = useCallback((id: string): void => {
    if (chat.selectedFriend?.id !== id) {
      history.push(`/messages/${id}`)
    }
  }, [])

  const onLogOut = useCallback((): void => {
    history.push('/login')
    localStorage.removeItem('wsConnectKey')
    user.wsConnectKey = ''
  }, [])

  return (
    <div className="chat-page">
      <div className="chat-pop-up">
        <PopUp />
      </div>
      <Header onLogOutHandler={onLogOut} isHidden={typeof chat.selectedFriend !== 'undefined'} />
      <div className={cn('content', { 'content_full-height_mobile': chat.selectedFriend })}>
        <Sidebar isFriendSelected={typeof chat.selectedFriend !== 'undefined'}>
          <FriendList
            handleSelectFriend={handleSelectFriend}
            isLoading={chat.isLoading}
            friends={chat.friendList}
            selectedId={chat.selectedFriend?.id}
          />
        </Sidebar>
        <Chat isFriendNotSelected={typeof chat.selectedFriend === 'undefined'} isLoading={chat.isLoading} />
      </div>
    </div>
  )
}

export default observer(MessagePage)
