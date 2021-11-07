import { observer } from 'mobx-react-lite'

import Message from '../../atoms/Message'
import FileMessage from '../../atoms/FileMessage'
import EmptyContentPopup from '../../atoms/EmptyContentPopup'

import { IFileMessage } from '../../../interface/message'

import chat from '../../../store/chat'

import './styles.scss'

const MessageList: React.FC = () => {
  if (typeof chat.selectedFriend?.messages === 'undefined' || chat.selectedFriend.messages?.length === 0) {
    return (
      <EmptyContentPopup>
        <p>There is no messages yet</p> Start chatting
      </EmptyContentPopup>
    )
  }
  return (
    <div>
      {chat.selectedFriend.messages.map(({ text, type, author, id }) => {
        if (type === 'file') {
          const { size, name } = text as IFileMessage
          return (
            <Message key={id} author={author}>
              <FileMessage size={size} name={name} />
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

export default observer(MessageList)
