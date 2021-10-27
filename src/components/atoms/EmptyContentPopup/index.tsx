import './styles.scss'

interface IEmptyContentPopup {
  children: React.ReactNode
}

const EmptyContentPopup: React.FC<IEmptyContentPopup> = ({ children }) => {
  return (
    <div className="empty-popup">
      <div className="empty-popup__text">{children}</div>
    </div>
  )
}

export default EmptyContentPopup
