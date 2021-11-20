import { useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'

import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'
import FilePreview from '../FilePreview'

import { ReactComponent as PaperClip } from '../../../assets/images/paper-clip.svg'
import { ReactComponent as SendButtonIcon } from '../../../assets/images/send-button.svg'

import chat from '../../../store/chat'
import popup from '../../../store/popup'

import { IFileMessage } from '../../../interface/message'

import './styles.scss'

import { isFileValid } from './common'
import { FILE_LIMITS } from '../../../config'

interface IChatInput {
  onMessageSend: (message: string | IFileMessage) => void
  onFileUpload: (file: File) => void
}

const ChatInput: React.FC<IChatInput> = ({ onMessageSend, onFileUpload }) => {
  const [userMessage, setUserMessage] = useState<string>('')
  const [hasInputError, setHasInputError] = useState<boolean>(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const fileAcceptValues: string = useMemo(
    () => Object.values(FILE_LIMITS.types).reduce((acc, rec) => (acc ? `${acc},${rec.join(',')}` : rec.join(',')), ''),
    []
  )
  const isPreviewContentEmpty: boolean = Object.values(chat.previewContent).every((key) => key === '')

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (hasInputError) {
      setHasInputError(false)
    }

    setUserMessage(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const incomingFile: File | null = e.target.files && e.target.files[0]

    if (incomingFile && isFileValid(incomingFile)) {
      onFileUpload(incomingFile)

      if (hasInputError) {
        setHasInputError(false)
      }

      if (fileRef.current) {
        fileRef.current.value = ''
      }
    }
  }

  const handleSendClick = (): void => {
    if (chat.isFileLoading()) {
      popup.setMessage({
        type: 'error',
        text: 'Please wait until the file is loaded!'
      })
      return
    }

    if (userMessage === '' && typeof chat.previewContent.binaryFile === 'undefined') {
      setHasInputError(true)
      return
    }

    if (userMessage && typeof chat.previewContent.binaryFile === 'undefined') {
      onMessageSend(userMessage)

      setUserMessage('')
      return
    }

    if (userMessage === '' && typeof chat.previewContent.binaryFile !== 'undefined') {
      const incomingFile: IFileMessage = {
        size: chat.previewContent.size,
        name: chat.previewContent.name,
        fileLink: '',
        binaryFile: chat.previewContent.binaryFile
      }

      onMessageSend(incomingFile)

      chat.resetPreviewContent()
      return
    }

    if (userMessage && typeof chat.previewContent.binaryFile !== 'undefined') {
      const incomingFile: IFileMessage = {
        size: chat.previewContent.size,
        name: chat.previewContent.name,
        fileLink: '',
        binaryFile: chat.previewContent.binaryFile
      }

      onMessageSend(userMessage)
      onMessageSend(incomingFile)

      chat.resetPreviewContent()
      setUserMessage('')
      return
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      setUserMessage((prev) => `${prev}\n`)
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendClick()
    }
  }

  const handleFileDelete = () => {
    chat.resetPreviewContent()
  }

  return (
    <div className="chat-input-container">
      <div
        className={cn('file-preview-container', {
          'file-preview-container_hidden': isPreviewContentEmpty
        })}
      >
        {!isPreviewContentEmpty && (
          <FilePreview
            onDelete={handleFileDelete}
            fileSrc={chat.previewContent.fileLink}
            name={chat.previewContent.name}
            size={chat.previewContent.size}
            type={chat.previewContent.type}
          />
        )}
      </div>

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
    </div>
  )
}

export default observer(ChatInput)
