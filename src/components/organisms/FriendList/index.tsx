import { observer } from 'mobx-react-lite'

import EmptyFriendList from '../../molecules/EmptyFriendList'
import Friend from '../../molecules/Friend'

import chat from '../../../store/chat'

interface IFriendList {
  handleSelectFriend: (id: string) => void
}

const FriendList: React.FC<IFriendList> = ({ handleSelectFriend }) => {
  if (chat.isLoading) {
    return <div></div>
  }

  if (!chat.friendList || chat.friendList.length === 0) {
    return <EmptyFriendList />
  }

  return (
    <>
      {chat.friendList.map(({ name, gender, lastMessage, isLastMessageFromUser, id }) => (
        <div key={`${name + id}`} onClick={() => handleSelectFriend(id)}>
          <Friend
            name={name}
            lastMessage={lastMessage}
            gender={gender}
            isLastMessageFromUser={isLastMessageFromUser}
            isSelected={id === chat.selectedFriend?.id}
          />
        </div>
      ))}
    </>
  )
}

export default observer(FriendList)
