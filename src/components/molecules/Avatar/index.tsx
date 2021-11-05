import React from 'react'

import Image from '../../atoms/Image'

import avatar from '../../../assets/images/avatar.png'

import './styles.scss'

type AvatarType = {
  src: string
  className?: string
}

const Avatar: React.FC<AvatarType> = ({ src = avatar, className = 'avatar-molekule' }) => {
  return (
    <div className={className}>
      <Image src={src} altText="avatar" />
    </div>
  )
}

export default React.memo(Avatar)
