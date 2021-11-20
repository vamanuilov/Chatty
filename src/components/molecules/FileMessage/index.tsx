import FileDescription from '../../atoms/FileDescription'

import { ReactComponent as FileIcon } from '../../../assets/images/fileIcon.svg'

import { HTTP_URL } from '../../../config'

import { IFileMessage } from '../../../interface/message'

import './styles.scss'

const FileMessage: React.FC<IFileMessage> = ({ name, size, fileLink }) => {
  return (
    <a className="file-link" href={fileLink !== '' ? `${HTTP_URL}${fileLink}` : undefined} target="_blank" download>
      <div className="file-message">
        <FileIcon className="file-message__icon" />
        <FileDescription name={name} size={size} />
      </div>
    </a>
  )
}

export default FileMessage
