import { ReactComponent as FileIcon } from '../../../assets/images/fileIcon.svg'
import { ReactComponent as PlayButton } from '../../../assets/images/play-button.svg'

import './styles.scss'

interface IPreviewContentIcon {
  type: string
  fileSrc?: string
}

const PreviewContentIcon: React.FC<IPreviewContentIcon> = ({ type, fileSrc }) => {
  const baseType: string = type.split('/')[0]
  switch (baseType) {
    case 'image':
      return <img src={fileSrc} />
    case 'video':
      return <video src={fileSrc} />
    case 'audio':
      return <PlayButton className="preview-svg" />
    default:
      return <FileIcon className="preview-svg" />
  }
}

export default PreviewContentIcon
