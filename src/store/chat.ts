import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { IFriends } from '../interface/friends'
import { IMessage } from '../interface/message'

export const ID_LENGTH: number = 5

class ChatStore {
  friendList: IFriends[] = []
  selectedFriend: IFriends | undefined
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  getFriends() {}

  setSelectedFriend(selectedId: string) {
    this.selectedFriend = this.friendList.find(({ id }) => id === selectedId)
  }

  addFriend(friend: IFriends) {
    const newFriend: IFriends = {
      ...friend,
      id: nanoid(ID_LENGTH),
      messages: [],
      lastTimeOnline: `${Math.floor(Math.random() + 60)} minutes`
    }

    this.friendList = [...this.friendList, newFriend]
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
      this.friendList = this.friendList.map((friend) =>
        friend.id === this.selectedFriend?.id ? this.selectedFriend : friend
      )
    }
  }
}

export default new ChatStore()
