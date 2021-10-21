import Image from '../../atoms/Image'

import male from '../../../assets/images/maleUser.png'
import female from '../../../assets/images/femaleUser.png'

type FriendIconType = {
  className?: 'string'
  gender: 'male' | 'female'
}

import './styles.scss'

const FriendIcon: React.FC<FriendIconType> = ({ className, gender }) => {
  const iconSrc = gender === 'male' ? male : female

  return (
    <div className={`m__img ${className ? className : ''}`}>
      <Image src={iconSrc} altText="male avatar" />
    </div>
  )
}

export default FriendIcon
