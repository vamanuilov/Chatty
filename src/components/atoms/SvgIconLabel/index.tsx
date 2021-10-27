type IconLabelType = {
  children: React.ReactNode
  htmlForId: string
}

import './styles.scss'

const SvgIconLabel: React.FC<IconLabelType> = ({ children, htmlForId }) => {
  return (
    <label tabIndex={0} className="svg-icon-label" htmlFor={htmlForId}>
      {children}
    </label>
  )
}

export default SvgIconLabel
