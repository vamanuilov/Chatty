import { useCallback, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useHistory, useParams } from 'react-router'
import { observer } from 'mobx-react-lite'

import Sidebar from '../../organisms/Sidebar'
import Header from '../../organisms/Header'
import Loader from '../../organisms/Loader'
import FriendList from '../../organisms/FriendList'
import Chat from '../../templates/Chat'

import { IFriends } from '../../../interface/friends'

import friendsStore from '../../../store/friends'

import './styles.scss'

export const ID_LENGTH: number = 5

const TEMPLATE_FRIENDS: IFriends[] = [
  {
    name: 'Konstantin Konstantinopolski',
    id: nanoid(ID_LENGTH),
    icon: 'male',
    lastMessage:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo blanditiis nam eligendi, excepturi sit voluptate fugit consectetur fugiat. Est, vitae! Beatae provident nihil magnam officia aliquam, quasi corporis tempore voluptatibus?',
    isLastMessageFromUser: true,
    lastTimeOnline: '10 minutes',
    messages: [
      {
        id: nanoid(ID_LENGTH),
        author: 'user',
        text: 'Lorem ipsum dolor sit amet',
        type: 'text'
      },
      {
        id: nanoid(ID_LENGTH),
        author: 'friend',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo blanditiis nam eligendi, excepturi sit voluptate fugit consectetur fugiat. Est, vitae! Beatae provident nihil magnam officia aliquam, quasi corporis tempore voluptatibus?',
        type: 'text'
      }
    ]
  },
  {
    name: 'Marina Joe',
    id: nanoid(ID_LENGTH),
    icon: 'female',
    lastTimeOnline: 'Online',
    messages: []
  },
  {
    name: 'Ernest Gillroy',
    id: nanoid(ID_LENGTH),
    icon: 'male',
    lastMessage: 'Lorem ipsum dolor sit amet',
    isLastMessageFromUser: true,
    lastTimeOnline: '3 minutes',
    messages: [
      {
        id: nanoid(ID_LENGTH),
        author: 'user',
        text: 'Lorem ipsum dolor sit amet',
        type: 'text'
      }
    ]
  },
  {
    name: 'Konstantin Konstantinopolski',
    id: nanoid(ID_LENGTH),
    icon: 'male',
    lastMessage: 'File',
    isLastMessageFromUser: true,
    lastTimeOnline: '3 minutes',
    messages: [
      {
        id: nanoid(ID_LENGTH),
        author: 'user',
        text: 'Lorem ipsum dolor sit amet',
        type: 'text'
      },
      {
        id: nanoid(ID_LENGTH),
        author: 'friend',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo blanditiis nam eligendi, excepturi sit voluptate fugit consectetur fugiat. Est, vitae! Beatae provident nihil magnam officia aliquam, quasi corporis tempore voluptatibus?',
        type: 'text'
      },
      {
        id: nanoid(ID_LENGTH),
        author: 'user',
        text: {
          size: '14 MB',
          name: 'File_for_exampl0011232555234.doc'
        },
        type: 'file'
      }
    ]
  }
]

const MessagePage: React.FC = () => {
  const { id: selectedId } = useParams<{ [v: string]: string }>()
  const history = useHistory()

  useEffect(() => {
    friendsStore.setFriends(TEMPLATE_FRIENDS)
  }, [])

  useEffect(() => {
    friendsStore.setSelectedFriend(selectedId)
  }, [selectedId])

  const handleSelectFriend = useCallback((id: string) => {
    if (friendsStore.selectedFriend?.id !== id) {
      history.push(`/messages/${id}`)
    }
  }, [])

  // TODO: fix loader styles
  return (
    <>
      <Loader isLoading={false} />
      <Header />
      <div className="content">
        <Sidebar>
          <FriendList handleSelectFriend={handleSelectFriend} />
        </Sidebar>
        <Chat />
      </div>
    </>
  )
}

export default observer(MessagePage)
