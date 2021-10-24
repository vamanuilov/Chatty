import SvgIconLabel from '../../atoms/SvgIconLabel'

import './styles.scss'

interface IInputWithSvgIcon {
  id: string
  type: 'file' | 'button'
  onClickHandler?: () => void
  children: React.ReactNode
}

const InputWithSvgIcon: React.FC<IInputWithSvgIcon> = ({ children, id, type, onClickHandler }) => {
  return (
    <div className="input-with-svg-icon">
      <SvgIconLabel htmlForId={id}>{children}</SvgIconLabel>
      <input className="input-with-svg-icon__input_hidden" id={id} type={type} onClick={onClickHandler}></input>
    </div>
  )
}

export default InputWithSvgIcon
