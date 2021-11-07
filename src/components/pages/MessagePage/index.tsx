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

import './styles.scss'

import user from '../../../store/user'
import socket from '../../../store/socket'

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

  const handleSelectFriend = useCallback((id: string) => {
    if (chat.selectedFriend?.id !== id) {
      history.push(`/messages/${id}`)
    }
  }, [])

  return (
    <div className="chat-page">
      {/* TODO: fix popup styles. move to center of page */}
      <PopUp />
      <Header />
      <div className={cn('content', { 'content_full-height_mobile': chat.selectedFriend })}>
        <Sidebar>
          <FriendList handleSelectFriend={handleSelectFriend} />
        </Sidebar>
        <Chat />
      </div>
    </div>
  )
}

export default observer(MessagePage)
