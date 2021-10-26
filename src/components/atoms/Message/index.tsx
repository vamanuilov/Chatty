import cn from 'classnames'

import { ReactComponent as Corner } from '../../../assets/images/corner.svg'

import './styles.scss'

type MessageType = {
  children: React.ReactNode
  author: 'user' | 'friend'
}

const Message: React.FC<MessageType> = ({ children, author }) => {
  return (
    <div className="message-container">
      <Corner
        className={cn('message-corner', {
          'message-corner_user': author === 'user',
          'message-corner_friend': author === 'friend'
        })}
      />
      <div className={cn('message', { message_user: author === 'user', message_friend: author === 'friend' })}>
        {children}
      </div>
    </div>
  )
}

export default Message
