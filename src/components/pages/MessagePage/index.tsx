import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useHistory, useParams } from 'react-router'

import Sidebar from '../../organisms/Sidebar'
import Header from '../../organisms/Header'
import Loader from '../../organisms/Loader'
import FriendList from '../../organisms/FriendList'
import Chat from '../../templates/Chat'

import { IMessage } from '../../../interface/message'
import { IFriends, ISelectedFriend } from '../../../interface/friends'

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
        message: 'Lorem ipsum dolor sit amet',
        type: 'text'
      },
      {
        id: nanoid(ID_LENGTH),
        author: 'friend',
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo blanditiis nam eligendi, excepturi sit voluptate fugit consectetur fugiat. Est, vitae! Beatae provident nihil magnam officia aliquam, quasi corporis tempore voluptatibus?',
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
        message: 'Lorem ipsum dolor sit amet',
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
        message: 'Lorem ipsum dolor sit amet',
        type: 'text'
      },
      {
        id: nanoid(ID_LENGTH),
        author: 'friend',
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo blanditiis nam eligendi, excepturi sit voluptate fugit consectetur fugiat. Est, vitae! Beatae provident nihil magnam officia aliquam, quasi corporis tempore voluptatibus?',
        type: 'text'
      },
      {
        id: nanoid(ID_LENGTH),
        author: 'user',
        message: {
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
  const [friends, setFriends] = useState<IFriends[]>(TEMPLATE_FRIENDS)
  const [messages, setMessages] = useState<IMessage[] | undefined>()
  const [selectedFriend, setSelectedFriend] = useState<ISelectedFriend | undefined>()

  useEffect(() => {
    const foundFriend = friends?.find((friend) => friend.id === selectedId)
    setSelectedFriend(foundFriend)
    setMessages(foundFriend?.messages)
  }, [selectedId])

  useEffect(() => {
    if (typeof messages !== 'undefined') {
      setFriends((prevFriends) => {
        return prevFriends.map((prevFriend) => {
          if (prevFriend.id === selectedId && JSON.stringify(messages) !== JSON.stringify(prevFriend.messages)) {
            const newLastMessage: IMessage = messages[messages.length - 1]
            const isLastMessageFromUser = newLastMessage.author === 'user'
            const lastMessage: string = newLastMessage.type === 'text' ? (newLastMessage.message as string) : 'File'

            return { ...prevFriend, messages, lastMessage, isLastMessageFromUser }
          }
          return prevFriend
        })
      })
    }
  }, [messages])

  const handleSelectFriend = (id: string) => {
    history.push(`/messages/${id}`)
  }

  return (
    <>
      <Loader isLoading={false} />
      <Header />
      <div className="content">
        <Sidebar>
          <FriendList selectedFriend={selectedFriend} handleSelectFriend={handleSelectFriend} friends={friends} />
        </Sidebar>
        <Chat setMessages={setMessages} selectedFriend={selectedFriend} messages={messages} />
      </div>
    </>
  )
}

export default MessagePage
