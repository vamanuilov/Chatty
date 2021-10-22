import { useState } from 'react'
import EmptyFriendList from '../../molekules/EmptyFriendList'
import Friend from '../../molekules/Friend'

export interface IFriends {
  name: string
  icon: 'male' | 'female'
  lastMessage: string
  isLastMessageFromUser: boolean
}

const FriendList = ({ friends }: { friends: IFriends[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (friends && friends.length === 0) {
    return <EmptyFriendList />
  }

  return (
    <>
      {friends.map((friend, index) => (
        <div key={`${friend.name + index}`} onClick={() => setSelectedIndex(index)}>
          <Friend
            name={friend.name}
            lastMessage={friend.lastMessage}
            icon={friend.icon}
            isLastMessageFromUser={friend.isLastMessageFromUser}
            isSelected={index === selectedIndex}
          />
        </div>
      ))}
    </>
  )
}

export default FriendList
