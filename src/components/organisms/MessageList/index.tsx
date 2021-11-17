import Message from '../../atoms/Message'
import FileMessage from '../../molecules/FileMessage'
import EmptyContentPopup from '../../atoms/EmptyContentPopup'

import { IFileMessage, IMessage } from '../../../interface/message'

interface IMessageList {
  messages: IMessage[] | undefined
}

const MessageList: React.FC<IMessageList> = ({ messages }) => {
  if (typeof messages === 'undefined' || messages?.length === 0) {
    return (
      <EmptyContentPopup>
        <p>There is no messages yet</p> Start chatting
      </EmptyContentPopup>
    )
  }
  return (
    <div>
      {messages.map(({ text, type, author, id }) => {
        if (type === 'file') {
          const { size, name, fileLink } = text as IFileMessage
          return (
            <Message key={id} author={author}>
              <FileMessage fileLink={fileLink} size={size} name={name} />
            </Message>
          )
        }

        return (
          <Message key={id} author={author}>
            {text}
          </Message>
        )
      })}
    </div>
  )
}

export default MessageList
