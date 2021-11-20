import cn from 'classnames'

import { ReactComponent as BackgroundImg } from '../../../assets/images/Background.svg'

import ChatMessages from '../ChatMessages'
import Loader from '../../atoms/Loader'

import { IFileMessage } from '../../../interface/message'
import { IFriends } from '../../../interface/friends'

import './styles.scss'

interface IChat {
  selectedFriend: IFriends | undefined
  isLoading: boolean
  onMessageSend: (message: string | IFileMessage) => void
  onFileUpload: (file: File) => void
}

const Chat: React.FC<IChat> = ({ isLoading, onMessageSend, onFileUpload, selectedFriend }) => {
  return (
    <div className={cn('chat-container', { 'chat-container_hidden': typeof selectedFriend === 'undefined' })}>
      <div className="chat-container__loader">
        <Loader isLoading={isLoading} />
      </div>
      <div className="chat-container__background">
        <BackgroundImg className="chat-container__img" />
      </div>
      <div className={cn('chat', { chat_loading: isLoading })}>
        <ChatMessages onMessageSend={onMessageSend} onFileUpload={onFileUpload} selectedFriend={selectedFriend} />
      </div>
    </div>
  )
}

export default Chat
