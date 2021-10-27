import Message from '../../atoms/Message'
import FileMessage from '../../atoms/FileMessage'
import EmptyContentPopup from '../../atoms/EmptyContentPopup'

import { IFileMessage, IMessage } from '../../../interface/message'

interface IMessageList {
  messages: IMessage[] | undefined
}

import './styles.scss'

const MessageList: React.FC<IMessageList> = ({ messages }) => {
  if (typeof messages === 'undefined' || messages.length === 0) {
    return (
      <EmptyContentPopup>
        <p>There is no messages yet</p> Start chatting
      </EmptyContentPopup>
    )
  }
  return (
    <div>
      {messages?.map(({ message, type, author, id }) => {
        if (type === 'file') {
          const { size, name } = message as IFileMessage
          return (
            <Message key={id} author={author}>
              <FileMessage size={size} name={name} />
            </Message>
          )
        }

        return (
          <Message key={id} author={author}>
            {message}
          </Message>
        )
      })}
    </div>
  )
}

export default MessageList
