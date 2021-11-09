import EmptyFriendList from '../../molecules/EmptyFriendList'
import Friend from '../Friend'

import { IFriends } from '../../../interface/friends'

interface IFriendList {
  handleSelectFriend: (id: string) => void
  friends: IFriends[] | undefined
  isLoading: boolean
  selectedId: string | undefined
}

const FriendList: React.FC<IFriendList> = ({ handleSelectFriend, isLoading, friends, selectedId }) => {
  if (isLoading) {
    return <div></div>
  }

  if (!friends || friends.length === 0) {
    return <EmptyFriendList />
  }

  return (
    <>
      {friends.map(({ name, gender, lastMessage, isLastMessageFromUser, id }) => (
        <div key={`${name + id}`} onClick={() => handleSelectFriend(id)}>
          <Friend
            name={name}
            lastMessage={lastMessage}
            gender={gender}
            isLastMessageFromUser={isLastMessageFromUser}
            isSelected={id === selectedId}
          />
        </div>
      ))}
    </>
  )
}

export default FriendList
