import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { IFriends } from '../interface/friends'
import { IMessage } from '../interface/message'
import { convertByteToMByte } from '../utils'
import { uploadFile } from '../utils/api'

import popup from './popup'

interface IFileLimits {
  size: number
  types: {
    [v: string]: string[]
  }
}

interface IPreviewContent {
  type: string
  fileSrc?: string
}

export const ID_LENGTH: number = 5

export const FILE_LIMITS: IFileLimits = {
  size: 2,
  types: {
    video: ['video/mp4', 'video/gg', 'video/webm'],
    audio: ['audio/mpeg', 'audio/ogg'],
    image: ['image/jpeg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg+xml']
  }
}

class ChatStore {
  friendList: IFriends[] = []
  selectedFriend: IFriends | undefined
  isLoading: boolean = false
  isFilePreviewModalOpen: boolean = false
  previewContent: IPreviewContent = {
    type: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  setIsFilePreviewModalOpen(value: boolean) {
    this.isFilePreviewModalOpen = value
  }

  setPreviewContent(type: string, fileSrc: string) {
    this.previewContent = {
      type,
      fileSrc
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
    this.selectedFriend = { ...this.selectedFriend, messages: newMessages, lastMessage, isLastMessageFromUser: true }
    this.friendList = this.friendList.map((friend) =>
      friend.id === this.selectedFriend?.id ? this.selectedFriend : friend
    )
  }

  sendFile = async (file: File): Promise<void> => {
    const { name, size, type } = file
    const convertedSize: number = convertByteToMByte(size)

    if (convertedSize > FILE_LIMITS.size) {
      popup.setMessage({
        type: 'error',
        text: `File must be less than 2 MB \n Upload another file`
      })
      return
    }

    if (Object.values(FILE_LIMITS.types).every((mimeTypes) => mimeTypes.every((item) => item !== type))) {
      popup.setMessage({
        type: 'error',
        text: `Wrong file format \n Upload another file`
      })
      return
    }

    const fileData = new FormData()

    fileData.append('name', name)
    fileData.append('type', type)
    fileData.append('size', String(size))
    fileData.append('0', file)

    try {
      const response: string = await uploadFile(fileData)

      if (response.includes('/file')) {
        this.addMessage({
          text: { size: `${convertedSize.toFixed(2)} MB`, name: name, fileLink: response },
          author: 'user',
          id: nanoid(ID_LENGTH),
          type: 'file'
        })
      } else {
        popup.setMessage({
          type: 'error',
          text: response
        })
      }
    } catch (err) {
      popup.setMessage({
        type: 'error',
        text: `Can't upload file. \n Try again`
      })
    }
  }
}

export default new ChatStore()
