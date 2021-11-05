import { useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'

import Sidebar from '../../organisms/Sidebar'
import Header from '../../organisms/Header'
import FriendList from '../../organisms/FriendList'
import Chat from '../../templates/Chat'

import friendsStore from '../../../store/friends'

import './styles.scss'

const MessagePage: React.FC = () => {
  const { id: selectedId } = useParams<{ [v: string]: string }>()
  const history = useHistory()

  useEffect(() => {
    friendsStore.getFriends()
  }, [])

  useEffect(() => {
    friendsStore.setSelectedFriend(selectedId)
  }, [selectedId])

  const handleSelectFriend = useCallback((id: string) => {
    if (friendsStore.selectedFriend?.id !== id) {
      history.push(`/messages/${id}`)
    }
  }, [])

  return (
    <div className="chat-page">
      <Header />
      <div className={cn('content', { 'content_full-height_mobile': friendsStore.selectedFriend })}>
        <Sidebar>
          <FriendList handleSelectFriend={handleSelectFriend} />
        </Sidebar>
        <Chat />
      </div>
    </div>
  )
}

export default observer(MessagePage)
