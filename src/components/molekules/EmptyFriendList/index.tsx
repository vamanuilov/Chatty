import Image from '../../atoms/Image'

import emptyUser from '../../../assets/images/emptyUsers.png'

import './styles.scss'
import Heading from '../../atoms/Heading'

const EmptyFriendList = () => {
  return (
    <div className="empty-friend">
      <div className="empty-friend__img">
        <Image src={emptyUser} altText="no users" />
      </div>
      <div className="empty-friend__text">
        <Heading element="h4">There is no other users yet</Heading>
      </div>
    </div>
  )
}

export default EmptyFriendList
