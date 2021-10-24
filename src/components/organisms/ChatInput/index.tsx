import React, { useState } from 'react'
import TextInputAtom from '../../atoms/InputField'
import InputWithSvgIcon from '../../molekules/InputWithSvgIcon'

import { ReactComponent as PaperClip } from '../../../assets/images/paper-clip.svg'
import { ReactComponent as SendButtonIcon } from '../../../assets/images/send-button.svg'

import './styles.scss'

const ChatInput: React.FC = () => {
  const [userMessage, setUserMessage] = useState<string>('')

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value)
  }

  return (
    <div className="chat-input">
      <div className="file-input">
        <InputWithSvgIcon type="file" id="chatInputFile">
          <PaperClip />
        </InputWithSvgIcon>
      </div>
      <div className="text-input">
        <TextInputAtom
          type="text"
          placeholder="Write something..."
          id="chatTextInput"
          value={userMessage}
          onChangeHandler={handleMessageInput}
          className="text-input__input"
        />
      </div>
      <div className="send-button">
        <InputWithSvgIcon type="button" id="sendButton" onClickHandler={() => console.log(userMessage)}>
          <SendButtonIcon />
        </InputWithSvgIcon>
      </div>
    </div>
  )
}

export default ChatInput
