import { observer } from 'mobx-react-lite'

import EmptyFriendList from '../../molekules/EmptyFriendList'
import Friend from '../../molekules/Friend'

import friendsStore from '../../../store/friends'

interface IFriendList {
  handleSelectFriend: (id: string) => void
}

const FriendList: React.FC<IFriendList> = ({ handleSelectFriend }) => {
  if (!friendsStore.friends || friendsStore.friends.length === 0) {
    return <EmptyFriendList />
  }

  return (
    <>
      {friendsStore.friends.map(({ name, icon, lastMessage, isLastMessageFromUser, id }) => (
        <div key={`${name + id}`} onClick={() => handleSelectFriend(id)}>
          <Friend
            name={name}
            lastMessage={lastMessage}
            icon={icon}
            isLastMessageFromUser={isLastMessageFromUser}
            isSelected={id === friendsStore.selectedFriend?.id}
          />
        </div>
      ))}
    </>
  )
}

export default observer(FriendList)
