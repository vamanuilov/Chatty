import React from 'react'

type LabelType = {
  forId?: string | undefined
  labelText: string
}

import './styles.scss'

const Label: React.FC<LabelType> = ({ forId, labelText }) => {
  return (
    <label className="label-atom" htmlFor={forId}>
      {labelText}
    </label>
  )
}

export default React.memo(Label)
