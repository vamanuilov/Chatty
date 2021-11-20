import React from 'react'
import cn from 'classnames'

import RefreshButton from '../RefreshButton'

import { ReactComponent as Corner } from '../../../assets/images/corner.svg'
import { ReactComponent as ErrorIcon } from '../../../assets/images/error.svg'
import { ReactComponent as LoadIcon } from '../../../assets/images/Loader.svg'

import './styles.scss'

interface IMessageListitem {
  children: React.ReactNode
  author: 'user' | 'friend'
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

const Message: React.FC<IMessageListitem> = ({ children, author, isLoading, isError, onRetry }) => {
  return (
    <div className="message-container">
      <Corner
        className={cn('message-corner', {
          'message-corner_user': author === 'user',
          'message-corner_friend': author === 'friend'
        })}
      />
      <div
        className={cn('message', {
          message_user: author === 'user',
          message_friend: author === 'friend',
          'message_state-shown': isLoading || isError
        })}
      >
        {(isError || isLoading) && (
          <div className="message__states">
            {isLoading && (
              <div className="message_loading">
                <LoadIcon className="message__load-icon" />
              </div>
            )}
            {isError && (
              <>
                <RefreshButton
                  onClickHandler={() => {
                    onRetry && onRetry()
                  }}
                />
                <div className="message_error">
                  <ErrorIcon className="message__error-icon" />
                </div>
              </>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default React.memo(Message)
