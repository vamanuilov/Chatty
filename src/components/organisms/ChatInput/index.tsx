import React, { useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { nanoid } from 'nanoid'

import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'

import { ReactComponent as PaperClip } from '../../../assets/images/paper-clip.svg'
import { ReactComponent as SendButtonIcon } from '../../../assets/images/send-button.svg'

import chatStore, { FILE_LIMITS, ID_LENGTH } from '../../../store/chat'

import './styles.scss'

const ChatInput: React.FC = () => {
  const [userMessage, setUserMessage] = useState<string>('')
  const [hasInputError, setHasInputError] = useState<boolean>(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const fileAcceptValues: string = useMemo(
    () => Object.values(FILE_LIMITS.types).reduce((acc, rec) => (acc ? `${acc},${rec.join(',')}` : rec.join(',')), ''),
    []
  )

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (hasInputError) {
      setHasInputError(false)
    }

    setUserMessage(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incomingFile: File | null = e.target.files && e.target.files[0]

    if (incomingFile) {
      chatStore.sendFile(incomingFile)

      if (fileRef.current) {
        fileRef.current.value = ''
      }
    }
  }

  const handleSendClick = () => {
    if (userMessage === '') {
      setHasInputError(true)
    } else {
      chatStore.addMessage({ text: userMessage, author: 'user', id: nanoid(ID_LENGTH), type: 'text' })
      setUserMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      setUserMessage((prev) => `${prev} \n`)
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendClick()
    }
  }

  return (
    <div className="chat-input">
      <div className="file-input">
        <InputWithSvgIcon
          elemRef={fileRef}
          type="file"
          accept={fileAcceptValues}
          id="chatInputFile"
          onChangeHandler={handleFileUpload}
        >
          <PaperClip className="file-input__icon" />
        </InputWithSvgIcon>
      </div>
      <div className="text-input">
        <textarea
          placeholder="Write something..."
          id="chatTextInput"
          value={userMessage}
          onChange={handleMessageInput}
          className={cn('text-input__textarea', { 'text-input__textarea_error': hasInputError })}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="send-button">
        <InputWithSvgIcon type="button" id="sendButton" onClickHandler={handleSendClick}>
          <SendButtonIcon className="send-button__icon" />
        </InputWithSvgIcon>
      </div>
    </div>
  )
}

export default React.memo(ChatInput)
