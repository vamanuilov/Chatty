import { IMessage } from './message'

export interface IFriend {
  name: string
  lastMessage?: string
  icon: 'male' | 'female'
  isLastMessageFromUser?: boolean
  isSelected?: boolean
}

export interface IFriends extends Omit<IFriend, 'isSelected'> {
  id: string
  lastTimeOnline: string
  messages: IMessage[] | undefined
}

export interface ISelectedFriend extends Pick<IFriends, 'name' | 'icon' | 'lastTimeOnline' | 'id'> {}
