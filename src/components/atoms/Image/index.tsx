type ImageType = {
  src: string
  altText: string
  size?: {
    height: string
    width: string
  }
}

import './styles.scss'

const Image: React.FC<ImageType> = ({ src, altText, size }) => {
  return <img className="a__img" src={src} alt={altText} style={size} />
}

export default Image
