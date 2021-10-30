import { IMessage } from './message'

export interface IFriends {
  name: string
  lastMessage?: string
  icon: 'male' | 'female'
  isLastMessageFromUser?: boolean
  id: string
  lastTimeOnline: string
  messages: IMessage[] | undefined
}
