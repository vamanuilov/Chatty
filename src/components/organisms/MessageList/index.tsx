import Message from '../Message'
import FileMessage from '../../molecules/FileMessage'
import EmptyContentPopup from '../../atoms/EmptyContentPopup'

import { IMessage } from '../../../interface/message'

import chat from '../../../store/chat'

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
      {messages.map(({ text, type, author, id, isFileError = false, isFileLoading = false }) => {
        if (type === 'file' && typeof text !== 'string') {
          const { size, name, fileLink } = text
          const retryHandler = (): void => {
            if (text.binaryFile) {
              chat.sendFile(text.binaryFile, id)
            }
          }
          return (
            <Message key={id} author={author} isLoading={isFileLoading} isError={isFileError} onRetry={retryHandler}>
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
