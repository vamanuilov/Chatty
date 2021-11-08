import React from 'react'

import { ReactComponent as FileIcon } from '../../../assets/images/fileIcon.svg'
import { HTTP_URL } from '../../../config'

import { IFileMessage } from '../../../interface/message'

import './styles.scss'

const FileMessage: React.FC<IFileMessage> = ({ name, size, fileLink }) => {
  return (
    <a className="file-link" href={`${HTTP_URL}${fileLink}`} target="_blank" download>
      <div className="file-message">
        <FileIcon className="file-message__icon" />
        <div className="file-message__description">
          <div className="file-message__name">{name}</div>
          <div className="file-message__size">{size}</div>
        </div>
      </div>
    </a>
  )
}

export default FileMessage
