import FileDescription from '../../atoms/FileDescription'
import PreviewContentIcon from '../../atoms/PreviewContent'
import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'

import { ReactComponent as TrashCanIcon } from '../../../assets/images/trash-can.svg'

import './styles.scss'

import chat from '../../../store/chat'

interface IFilePreview {
  fileSrc: string
  type: string
  name: string
  size: string
  onDelete: () => void
}

const FilePreview: React.FC<IFilePreview> = ({ fileSrc, name, size, type, onDelete }) => {
  return (
    <div className="file-preview">
      <div className="preview-content">
        <div className="preview-content__icon" onClick={() => chat.setIsFilePreviewModalOpen(true)}>
          <PreviewContentIcon fileSrc={fileSrc} type={type} />
        </div>
        <FileDescription name={name} size={size} />
      </div>

      <InputWithSvgIcon id="delete-file" type="button" onClickHandler={onDelete}>
        <TrashCanIcon height="20px" width="20px" fill="red" />
      </InputWithSvgIcon>
    </div>
  )
}

export default FilePreview
