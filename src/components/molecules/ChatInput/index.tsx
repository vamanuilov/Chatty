import React, { useRef, useState } from 'react'
import { nanoid } from 'nanoid'

import InputWithSvgIcon from '../InputWithSvgIcon'

import { ReactComponent as PaperClip } from '../../../assets/images/paper-clip.svg'
import { ReactComponent as SendButtonIcon } from '../../../assets/images/send-button.svg'

import chat, { ID_LENGTH } from '../../../store/chat'

import './styles.scss'

const ChatInput: React.FC = () => {
  const [userMessage, setUserMessage] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0]
    const fileSize: string | null = file && (file?.size / (1024 * 1024)).toFixed(2)

    if (file) {
      chat.addMessage({
        text: { size: `${fileSize} MB`, name: file?.name },
        author: 'user',
        id: nanoid(ID_LENGTH),
        type: 'file'
      })

      if (fileRef.current) {
        fileRef.current.value = ''
      }
    }
  }

  const handleSendClick = () => {
    chat.addMessage({ text: userMessage, author: 'user', id: nanoid(ID_LENGTH), type: 'text' })
    setUserMessage('')
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
        <InputWithSvgIcon elemRef={fileRef} type="file" id="chatInputFile" onChangeHandler={handleFileUpload}>
          <PaperClip className="file-input__icon" />
        </InputWithSvgIcon>
      </div>
      <div className="text-input">
        <textarea
          placeholder="Write something..."
          id="chatTextInput"
          value={userMessage}
          onChange={handleMessageInput}
          className="text-input__textarea"
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
