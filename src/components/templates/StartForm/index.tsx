import React from 'react'

import { ReactComponent as BackgroundImg } from '../../../assets/images/Background.svg'

interface IFormTemplate {
  form: JSX.Element
  header: JSX.Element
}

import './styles.scss'

const FormTemplate: React.FC<IFormTemplate> = ({ form, header }) => {
  return (
    <div className="page">
      <div className="page__bg">
        <div className="page-img">
          <BackgroundImg className="page-img__svg" />
        </div>
      </div>
      <div className="page__content">
        <div className="form-container">
          <div className="form-container__header">{header}</div>
          <div className="form-container__form">{form}</div>
        </div>
      </div>
    </div>
  )
}

export default FormTemplate
