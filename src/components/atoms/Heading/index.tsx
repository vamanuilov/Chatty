type HeadingType = {
  element: 'h1' | 'h2' | 'h3' | 'h4'
}

import './styles.scss'

const Heading: React.FC<HeadingType> = ({ element, children }) => {
  const Tag = element as keyof JSX.IntrinsicElements
  return <Tag>{children}</Tag>
}

export default Heading
