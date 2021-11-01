import { makeAutoObservable, runInAction } from 'mobx'
import { nanoid } from 'nanoid'

import { IFriends } from '../interface/friends'
import { IMessage } from '../interface/message'

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
class FriendStore {
  friends: IFriends[] = []

  selectedFriend: IFriends | undefined

  isLoading: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  getFriends() {
    this.isLoading = true
    setTimeout(() => {
      runInAction(() => {
        this.friends = [...TEMPLATE_FRIENDS]
        this.isLoading = false
      })
    }, 500)
  }

  setSelectedFriend(selectedId: string) {
    this.selectedFriend = this.friends.find(({ id }) => id === selectedId)
  }

  addFriend(friend: IFriends) {
    const newFriend: IFriends = {
      ...friend,
      id: nanoid(ID_LENGTH),
      messages: [],
      lastTimeOnline: `${Math.floor(Math.random() + 60)} minutes`
    }

    this.friends = [...this.friends, newFriend]
  }

  addMessage(newMessage: IMessage) {
    if (!newMessage || newMessage.text === '' || typeof this.selectedFriend === 'undefined') {
      return
    }

    const friendMessages: IMessage[] | undefined = this.selectedFriend?.messages
    const newMessages: IMessage[] = friendMessages ? [...friendMessages, newMessage] : [newMessage]

    if (JSON.stringify(newMessages) !== JSON.stringify(friendMessages)) {
      const lastMessage: string = newMessage.type === 'text' ? (newMessage.text as string) : 'File'
      this.selectedFriend = { ...this.selectedFriend, messages: newMessages, lastMessage, isLastMessageFromUser: true }
      this.friends = this.friends.map((friend) =>
        friend.id === this.selectedFriend?.id ? this.selectedFriend : friend
      )
    }
  }
}

export default new FriendStore()
