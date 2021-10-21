import EmptyFriendList from '../../molekules/EmptyFriendList'
import Friend from '../../molekules/Friend'

export interface IFriends {
  name: string
  icon: 'male' | 'female'
  lastMessage: string
  isLastMessageFromUser: boolean
}

const FriendList = ({ friends }: { friends: IFriends[] }) => {
  if (friends && friends.length === 0) {
    return <EmptyFriendList />
  }

  return (
    <>
      {friends.map((friend, index) => (
        <Friend
          key={`${friend.name + index}`}
          name={friend.name}
          additionalText={friend.lastMessage}
          icon={friend.icon}
          isLastMessageFromUser={friend.isLastMessageFromUser}
          isSelected={index === 2}
        />
      ))}
    </>
  )
}

export default FriendList
