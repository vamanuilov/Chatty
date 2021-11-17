import './styles.scss'

interface IFileDescription {
  name: string
  size: string
}

const FileDescription: React.FC<IFileDescription> = ({ name, size }) => {
  return (
    <div className="file-description">
      <div className="file-description__name">{name}</div>
      <div className="file-description__size">{size}</div>
    </div>
  )
}

export default FileDescription
