import { ReactComponent as FileIcon } from '../../../assets/images/fileIcon.svg'
import { ReactComponent as PlayButton } from '../../../assets/images/play-button.svg'

import './styles.scss'

interface IPreviewContent {
  type: string
  fileSrc?: string
  isInModal?: boolean
}

const PreviewContent: React.FC<IPreviewContent> = ({ type, fileSrc, isInModal = false }) => {
  const baseType: string = type.split('/')[0]
  switch (baseType) {
    case 'image':
      return <img src={fileSrc} className="preview-item" />
    case 'video':
      return <video src={fileSrc} className="preview-item" autoPlay={isInModal} controls={isInModal} />
    case 'audio':
      if (isInModal) {
        return <audio src={fileSrc} className="preview-item" autoPlay={isInModal} controls></audio>
      }
      return <PlayButton className="preview-item preview-svg" />
    default:
      return <FileIcon className="preview-item preview-svg" />
  }
}

export default PreviewContent
