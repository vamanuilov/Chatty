import EmptyFriendList from '../../molekules/EmptyFriendList'
import Friend from '../../molekules/Friend'

import { IFriends, ISelectedFriend } from '../../../interface/friends'

interface IFriendList {
  friends: IFriends[] | undefined
  selectedFriend: ISelectedFriend | undefined
  handleSelectFriend: (id: string) => void
}

const FriendList: React.FC<IFriendList> = ({ selectedFriend, handleSelectFriend, friends }) => {
  if (!friends || (friends && friends.length === 0)) {
    return <EmptyFriendList />
  }

  return (
    <>
      {friends &&
        friends.map(({ name, icon, lastMessage, isLastMessageFromUser, id }) => (
          <div key={`${name + id}`} onClick={() => handleSelectFriend(id)}>
            <Friend
              name={name}
              lastMessage={lastMessage}
              icon={icon}
              isLastMessageFromUser={isLastMessageFromUser}
              isSelected={id === selectedFriend?.id}
            />
          </div>
        ))}
    </>
  )
}

export default FriendList
