import { makeAutoObservable, runInAction } from 'mobx'
import { nanoid } from 'nanoid'
import { ID_LENGTH } from '../config'

import { IFriends } from '../interface/friends'
import { IMessage, IPreviewContent } from '../interface/message'
import { convertByteToMByte } from '../utils'
import { uploadFile } from '../utils/api'

import popup from './popup'
import socket from './socket'

class ChatStore {
  friendList: IFriends[] = []
  selectedFriend: IFriends | undefined
  isLoading: boolean = false
  isFilePreviewModalOpen: boolean = false
  previewContent: IPreviewContent = {
    type: '',
    fileLink: '',
    name: '',
    size: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  setIsFilePreviewModalOpen(value: boolean) {
    this.isFilePreviewModalOpen = value
  }

  setPreviewContent(fileLink: string, binaryFile: File) {
    const { type, name, size } = binaryFile
    this.previewContent = {
      type,
      fileLink,
      name,
      size: `${convertByteToMByte(size).toFixed(2)} MB`,
      binaryFile
    }
  }

  resetPreviewContent() {
    this.previewContent = {
      type: '',
      fileLink: '',
      name: '',
      size: ''
    }
  }

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
    if (newMessage.text === '' || typeof this.selectedFriend === 'undefined') {
      return
    }

    const friendMessages: IMessage[] | undefined = this.selectedFriend?.messages
    const newMessages: IMessage[] = friendMessages ? [...friendMessages, newMessage] : [newMessage]
    const lastMessage: string = newMessage.type === 'text' ? (newMessage.text as string) : 'File'

    this.selectedFriend = {
      ...this.selectedFriend,
      messages: newMessages,
      lastMessage,
      isLastMessageFromUser: newMessage.author === 'user'
    }
    this.updateFriendList(this.selectedFriend)

    if (newMessage.author === 'user') {
      if (typeof newMessage.text === 'string') {
        socket.sendMessage(newMessage.text)
      } else {
        this.sendFile(this.previewContent.binaryFile, newMessage.id)
      }
    }

    localStorage.setItem(`messages-${this.selectedFriend.name}`, JSON.stringify(this.selectedFriend?.messages))
  }

  async sendFile(file: File | undefined, fileMessageId: string): Promise<void> {
    if (typeof file === 'undefined') {
      popup.setMessage({
        type: 'error',
        text: `Can't send file.\nThere is nothing to send`
      })
      return
    }

    const { name, size, type } = file
    const messageToUpdate: IMessage | undefined = this.selectedFriend?.messages?.find(
      (message) => message.id === fileMessageId
    )
    const fileData = new FormData()

    if (typeof messageToUpdate === 'undefined') {
      popup.setMessage({
        type: 'error',
        text: `Something wrong.\nCan't upload file`
      })
      return
    }

    fileData.append('name', name)
    fileData.append('type', type)
    fileData.append('size', String(size))
    fileData.append('0', file)

    const fileMessageLoading: IMessage = { ...messageToUpdate, isFileLoading: true, isFileError: false }
    this.updateFileMessage(fileMessageLoading, fileMessageId)

    try {
      const response: string = await uploadFile(fileData)

      if (response.includes('/file')) {
        if (typeof messageToUpdate.text !== 'string') {
          const messageWithFileLink: IMessage = {
            ...messageToUpdate,
            isFileLoading: false,
            text: { ...messageToUpdate.text, fileLink: response }
          }

          runInAction(() => {
            this.updateFileMessage(messageWithFileLink, fileMessageId)
          })
        }
      } else {
        popup.setMessage({
          type: 'error',
          text: response
        })
      }
    } catch {
      popup.setMessage({
        type: 'error',
        text: `Can't upload file. \n Try again`
      })

      runInAction(() => {
        const fileMessageError: IMessage = { ...messageToUpdate, isFileLoading: false, isFileError: true }
        this.updateFileMessage(fileMessageError, fileMessageId)
      })
    }
  }

  updateFriendList(updatedFriend: IFriends | undefined): void {
    this.friendList = this.friendList.map((friend) => (friend.id === updatedFriend?.id ? updatedFriend : friend))
  }

  updateFileMessage(updatedMessage: IMessage, fileMessageId: string): void {
    const newMessages = this.selectedFriend?.messages?.map((message) => {
      if (message.id === fileMessageId && typeof message.text !== 'string') {
        return { ...message, ...updatedMessage }
      } else {
        return message
      }
    })

    this.selectedFriend = this.selectedFriend && { ...this.selectedFriend, messages: newMessages }
    this.updateFriendList(this.selectedFriend)
  }

  isFileLoading(): boolean {
    return this.friendList.some((friend) => friend.messages?.some((message) => message.isFileLoading))
  }
}

export default new ChatStore()
