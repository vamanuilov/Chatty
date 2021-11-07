import { IMessage } from './message'

export interface IFriends {
  name: string
  lastMessage?: string
  gender: 'male' | 'female'
  isLastMessageFromUser?: boolean
  id: string
  lastTimeOnline: string
  messages?: IMessage[]
}
