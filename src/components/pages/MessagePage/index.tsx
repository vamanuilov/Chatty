import { useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import cn from 'classnames'

import Modal from '../../atoms/Modal'
import PreviewContent from '../../atoms/PreviewContent'
import Sidebar from '../../organisms/Sidebar'
import Header from '../../organisms/Header'
import FriendList from '../../organisms/FriendList'
import Chat from '../../organisms/Chat'
import PopUp from '../../organisms/PopUp'

import chat from '../../../store/chat'
import user from '../../../store/user'
import socket from '../../../store/socket'

import { ID_LENGTH } from '../../../config'

import './styles.scss'

import { IFileMessage } from '../../../interface/message'

const MessagePage: React.FC = () => {
  const { id: selectedId } = useParams<{ [v: string]: string }>()
  const history = useHistory()

  useEffect(() => {
    socket.connect(user.wsConnectKey)

    return () => {
      socket.closeConnection()
    }
  }, [user.wsConnectKey])

  useEffect(() => {
    chat.setSelectedFriend(selectedId)
  }, [selectedId])

  const handleSelectFriend = useCallback((id: string): void => {
    if (chat.selectedFriend?.id !== id) {
      history.push(`/messages/${id}`)
    }
  }, [])

  const handleCloseClick = () => {
    chat.setIsFilePreviewModalOpen(false)
  }

  const onLogOut = useCallback((): void => {
    history.push('/login')
    localStorage.removeItem('wsConnectKey')
    user.wsConnectKey = ''
  }, [])

  const onMessageSend = (message: string | IFileMessage): void => {
    if (typeof message === 'string') {
      chat.addMessage({ text: message, author: 'user', id: nanoid(ID_LENGTH), type: 'text' })
    } else {
      chat.addMessage({
        text: {
          size: message.size,
          name: message.name,
          fileLink: '',
          binaryFile: message.binaryFile
        },
        author: 'user',
        id: nanoid(ID_LENGTH),
        type: 'file'
      })
    }
  }

  const onFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      chat.setPreviewContent(reader.result as string, file)
    }
  }

  return (
    <div className="chat-page">
      <Modal isOpen={chat.isFilePreviewModalOpen} onClose={handleCloseClick}>
        <PreviewContent type={chat.previewContent.type} fileSrc={chat.previewContent.fileLink} isInModal />
      </Modal>
      <div className="chat-pop-up">
        <PopUp />
      </div>
      <Header onLogOutHandler={onLogOut} isHidden={typeof chat.selectedFriend !== 'undefined'} />
      <div className={cn('content', { 'content_full-height_mobile': chat.selectedFriend })}>
        <Sidebar isFriendSelected={typeof chat.selectedFriend !== 'undefined'}>
          <FriendList
            handleSelectFriend={handleSelectFriend}
            isLoading={chat.isLoading || socket.isLoading}
            friends={chat.friendList}
            selectedId={chat.selectedFriend?.id}
          />
        </Sidebar>
        <Chat
          selectedFriend={chat.selectedFriend}
          isLoading={chat.isLoading || socket.isLoading}
          onMessageSend={onMessageSend}
          onFileUpload={onFileUpload}
        />
      </div>
    </div>
  )
}

export default observer(MessagePage)
