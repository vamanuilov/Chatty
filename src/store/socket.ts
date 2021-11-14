import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { RETRY_AMOUNT, WS_URI } from '../config'

import chat, { ID_LENGTH } from './chat'
import popup from './popup'

import { IFriends } from '../interface/friends'

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
    this.socket = new WebSocket(`${WS_URI}?type=${this.type}&ws_id=${connectKey}`)
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
    this.isLoading = false
    // eslint-disable-next-line no-console
    console.warn('WS Connection closed! Refresh page or reconnect manually')
  }

  onMessage(incomingMessage: MessageEvent<string>) {
    if (incomingMessage.data.includes('type')) {
      const wsResponse: IWSResponse = JSON.parse(incomingMessage.data)

      switch (wsResponse.type) {
        case 'user_data': {
          // TODO: I don't know what to do with this data
          const userData: IUserData = wsResponse.data as IUserData

          console.log('user_data: ', userData)
          break
        }
        case 'users_list': {
          const usersList: IUserData[] = wsResponse.data as IUserData[]
          const friendList: IFriends[] = usersList.map((friend: IUserData) => ({
            name: friend.name,
            gender: friend.gender,
            id: nanoid(ID_LENGTH),
            lastTimeOnline: 'Online'
          }))
          chat.friendList = friendList
          break
        }
      }
    } else if (incomingMessage.data.includes('2222')) {
      /*TODO: remove this if block after backend fix.
      some sort of spam from server on file upload. need to be fixed on server.*/
      console.log('spam from server: ', incomingMessage)
      return
    } else {
      /* TODO: based on the fact that we have no message requirements yet,
      I think that all that is not processed is an error */
      popup.setMessage({
        type: 'error',
        text: incomingMessage.data
      })
    }
  }

  onError() {
    if (this.retryCount < RETRY_AMOUNT && this.socket?.url) {
      this.connect(this.socket?.url.split('ws_id=')[1])
      this.retryCount += 1
    } else {
      popup.setMessage({
        type: 'error',
        text: `Can't connect to the server. \n Try again`
      })
    }
    this.isLoading = false
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
    this.socket?.send(message)
  }

  closeConnection() {
    this.socket?.close()
  }
}

export default new SocketStore()
