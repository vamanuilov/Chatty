import Image from '../../atoms/Image'

import logo from '../../../assets/images/logo.png'

import './styles.scss'

const Logo = () => {
  return (
    <div className="o__logo">
      <Image src={logo} altText="logo" />
    </div>
  )
}

export default Logo
