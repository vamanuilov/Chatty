import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import chat from '../../../store/chat'

import './styles.scss'

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return <div className={cn('sidebar', { sidebar_hidden_mobile: chat.selectedFriend })}>{children}</div>
}

export default observer(SideBar)
