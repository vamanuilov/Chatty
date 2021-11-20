export interface IFileMessage {
  name: string
  size: string
  fileLink: string
  binaryFile?: File
}

export interface IMessage {
  author: 'user' | 'friend'
  type: 'text' | 'file'
  text: IFileMessage | string
  id: string
  isFileLoading?: boolean
  isFileError?: boolean
}

export interface IPreviewContent extends IFileMessage {
  type: string
}
