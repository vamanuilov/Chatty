import React from 'react'

import { ReactComponent as FileIcon } from '../../../assets/images/fileIcon.svg'

import './styles.scss'

export interface IFileMessage {
  name: string
  size: string
}

const FileMessage: React.FC<IFileMessage> = ({ name, size }) => {
  return (
    <div className="file-message">
      <FileIcon className="file-message__icon" />
      <div className="file-message__description">
        <div className="file-message__name">{name}</div>
        <div className="file-message__size">{size}</div>
      </div>
    </div>
  )
}

export default FileMessage
