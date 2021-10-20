import React from 'react'

import Image from '../../atoms/Image'

import logo from '../../../assets/images/logo.png'

import './styles.scss'

type LogoType = {
  className: string
}

const Logo: React.FC<LogoType> = ({ className }) => {
  return (
    <div className={className}>
      <Image src={logo} altText="logo" />
    </div>
  )
}

export default React.memo(Logo)
