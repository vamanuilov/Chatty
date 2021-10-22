type ImageType = {
  src: string
  altText: string
  size?: {
    height: string
    width: string
  }
}

import React from 'react'
import './styles.scss'

const Image: React.FC<ImageType> = ({ src, altText, size }) => {
  return <img className="img-atom" src={src} alt={altText} style={size} />
}

export default React.memo(Image)
