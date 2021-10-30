import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { ID_LENGTH } from '../components/pages/MessagePage'

import { IFriends } from '../interface/friends'
import { IMessage } from '../interface/message'

class FriendStore {
  friends: IFriends[] = []

  selectedFriend: IFriends | undefined

  constructor() {
    makeAutoObservable(this)
  }

  setFriends(friendList: IFriends[]) {
    this.friends = [...friendList]
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
      this.friends.map((friend) => (friend.id === this.selectedFriend?.id ? this.selectedFriend : friend))
    }
  }
}

export default new FriendStore()
