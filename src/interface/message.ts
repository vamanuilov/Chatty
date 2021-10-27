export interface IFileMessage {
  name: string
  size: string
}

export interface IMessage {
  author: 'user' | 'friend'
  type: 'text' | 'file'
  message: IFileMessage | string
  id: string
}
