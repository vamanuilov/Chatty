import { IMessage } from './message'
import { ISelectedFriend } from './friends'

export interface IChat {
  setMessages: React.Dispatch<React.SetStateAction<IMessage[] | undefined>>
  selectedFriend: ISelectedFriend | undefined
  messages: IMessage[] | undefined
}
