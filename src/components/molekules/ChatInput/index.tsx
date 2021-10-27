import React, { useRef, useState } from 'react'
import { nanoid } from 'nanoid'

import InputWithSvgIcon from '../InputWithSvgIcon'

import { ReactComponent as PaperClip } from '../../../assets/images/paper-clip.svg'
import { ReactComponent as SendButtonIcon } from '../../../assets/images/send-button.svg'

import { IMessage } from '../../../interface/message'

import './styles.scss'

interface IChatInput {
  setMessages: React.Dispatch<React.SetStateAction<IMessage[] | undefined>>
}

const ChatInput: React.FC<IChatInput> = ({ setMessages }) => {
  const [userMessage, setUserMessage] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0]
    const fileSize: string | null = file && (file?.size / (1024 * 1024)).toFixed(2)

    if (file) {
      setMessages &&
        setMessages(
          (prev) =>
            prev && [
              ...prev,
              { message: { size: `${fileSize} MB`, name: file?.name }, author: 'user', id: nanoid(), type: 'file' }
            ]
        )

      if (fileRef.current) {
        fileRef.current.value = ''
      }
    }
  }

  const handleSendClick = () => {
    setMessages &&
      setMessages((prev) => prev && [...prev, { message: userMessage, author: 'user', id: nanoid(), type: 'text' }])
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
          <PaperClip />
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
          <SendButtonIcon />
        </InputWithSvgIcon>
      </div>
    </div>
  )
}

export default React.memo(ChatInput)
