import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import friendsStore from '../../../store/friends'

import './styles.scss'

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return <div className={cn('sidebar', { sidebar_hidden_mobile: friendsStore.selectedFriend })}>{children}</div>
}

export default observer(SideBar)
