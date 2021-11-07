import { observer } from 'mobx-react-lite'

import EmptyFriendList from '../../molecules/EmptyFriendList'
import Friend from '../../molecules/Friend'

import friendsStore from '../../../store/friends'

interface IFriendList {
  handleSelectFriend: (id: string) => void
}

const FriendList: React.FC<IFriendList> = ({ handleSelectFriend }) => {
  if (friendsStore.isLoading) {
    return <div></div>
  }

  if (!friendsStore.friendList || friendsStore.friendList.length === 0) {
    return <EmptyFriendList />
  }

  return (
    <>
      {friendsStore.friendList.map(({ name, gender, lastMessage, isLastMessageFromUser, id }) => (
        <div key={`${name + id}`} onClick={() => handleSelectFriend(id)}>
          <Friend
            name={name}
            lastMessage={lastMessage}
            gender={gender}
            isLastMessageFromUser={isLastMessageFromUser}
            isSelected={id === friendsStore.selectedFriend?.id}
          />
        </div>
      ))}
    </>
  )
}

export default observer(FriendList)
