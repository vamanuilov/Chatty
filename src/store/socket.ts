import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { ID_LENGTH, RETRY_AMOUNT, WS_URI } from '../config'

import chat from './chat'
import popup from './popup'

import { IFriends } from '../interface/friends'
import { IMessage } from '../interface/message'

interface IUserData {
  name: string
  gender: 'male' | 'female'
}
interface IWSResponse {
  type: string
  data: IUserData | IUserData[] | string
}

class SocketStore {
  socket: WebSocket | undefined
  retryCount: number = 1
  isLoading: boolean = false
  type: string = 'testtest'

  constructor() {
    makeAutoObservable(this)
  }

  connect = (connectKey: string) => {
    this.isLoading = true
    console.log('###:', 'connectKey, WS_URI', connectKey, WS_URI)

    // this.socket = new WebSocket(`${WS_URI}?type=${this.type}&ws_id=${connectKey}`)
    // var HOST = location.origin.replace(/^http/, 'ws')
    this.socket = new WebSocket(`wss://server-chatty.herokuapp.com/?type=${this.type}&ws_id=${connectKey}`)

    this.socket.onopen = this.onOpen.bind(this)
    this.socket.onclose = this.onClose.bind(this)
    this.socket.onmessage = this.onMessage.bind(this)
    this.socket.onerror = this.onError.bind(this)
  }

  onOpen() {
    this.getFriendList()
    this.isLoading = false
  }

  onClose() {
    // eslint-disable-next-line no-console
    console.warn('WS Connection closed! Refresh page or reconnect manually')
  }

  onMessage(incomingMessage: MessageEvent<string>) {
    if (incomingMessage.data.includes('type')) {
      const wsResponse: IWSResponse = JSON.parse(incomingMessage.data)
      const getMessages = (friendName: string): IMessage[] => {
        /* TODO: Because I don't have a friend id on the server, a friend name is used, but it may not be unique.
        edit it after adding the ID to the server */
        const localMessages: string | null = localStorage.getItem(`messages-${friendName}`)
        const messages: IMessage[] = localMessages ? JSON.parse(localMessages) : []
        return messages
      }

      switch (wsResponse.type) {
        case 'users_list': {
          const usersList: IUserData[] = wsResponse.data as IUserData[]
          const friendList: IFriends[] = usersList.map((friend: IUserData) => {
            const messages: IMessage[] = getMessages(friend.name)
            const lastMessage: IMessage | undefined = messages[messages.length - 1]
            const lastMessageType = lastMessage?.type === 'text' ? (lastMessage.text as string) : 'File'

            return {
              name: friend.name,
              gender: friend.gender,
              id: nanoid(ID_LENGTH),
              lastTimeOnline: 'Online',
              lastMessage: lastMessage && lastMessageType,
              isLastMessageFromUser: lastMessage && lastMessage.author === 'user',
              messages: getMessages(friend.name)
            }
          })
          chat.friendList = friendList
          break
        }
        case 'message': {
          const message: any = wsResponse.data
          if (message.author === 'friend') {
            chat.addMessage({ text: message.text, id: nanoid(ID_LENGTH), type: 'text', author: 'friend' })
          }
          break
        }
      }
    } else if (incomingMessage.data.includes(`Your session is too old! Please re-login!`)) {
      popup.setMessage({
        type: 'error',
        text: incomingMessage.data
      })
      return
    }
  }

  onError() {
    if (this.retryCount < RETRY_AMOUNT && this.socket?.url) {
      this.connect(this.socket?.url.split('ws_id=')[1])
      this.retryCount += 1
    } else {
      this.isLoading = false

      popup.setMessage({
        type: 'error',
        text: `Can't connect to the server. \n Try again`
      })
    }
  }

  getFriendList() {
    this.socket?.send(
      JSON.stringify({
        type: 'users_list'
      })
    )
  }

  getUserData() {
    this.socket?.send(
      JSON.stringify({
        type: 'user_data'
      })
    )
  }

  sendMessage(message: string) {
    this.socket?.send(JSON.stringify({ type: 'message', text: message }))
  }

  closeConnection() {
    this.socket?.close()
  }
}

export default new SocketStore()
