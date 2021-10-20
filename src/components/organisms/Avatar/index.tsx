import Image from '../../atoms/Image'

import avatar from '../../../assets/images/avatar.png'

import './styles.scss'

const Avatar = () => {
  return (
    <div className="m__avatar">
      <Image src={avatar} altText="avatar" />
    </div>
  )
}

export default Avatar
