import FileDescription from '../../atoms/FileDescription'
import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'
import PreviewContentIcon from '../../atoms/PreviewContentIcon'

import { ReactComponent as TrashCanIcon } from '../../../assets/images/trash-can.svg'

import './styles.scss'

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
        <div className="preview-content__icon">
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
