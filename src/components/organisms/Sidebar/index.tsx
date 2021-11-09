import cn from 'classnames'

import './styles.scss'

interface ISideBar {
  isFriendSelected: boolean
}

const SideBar: React.FC<ISideBar> = ({ children, isFriendSelected }) => {
  return <div className={cn('sidebar', { sidebar_hidden_mobile: isFriendSelected })}>{children}</div>
}

export default SideBar
