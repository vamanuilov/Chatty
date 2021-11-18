import React, { useEffect, useRef } from 'react'

import InputWithSvgIcon from '../../molecules/InputWithSvgIcon'

import { ReactComponent as CloseIcon } from '../../../assets/images/icon_close.svg'

import './styles.scss'

interface IModal {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<IModal> = ({ isOpen, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkOutsideClick = (e: MouseEvent) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const checkEscapePress = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', checkOutsideClick)
    document.addEventListener('keydown', checkEscapePress)

    return () => {
      document.removeEventListener('mousedown', checkOutsideClick)
      document.removeEventListener('keydown', checkEscapePress)
    }
  })

  return (
    <>
      {isOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="close">
              <InputWithSvgIcon id="closeModal" type="button">
                <CloseIcon className="close__button" />
              </InputWithSvgIcon>
            </div>
            <div ref={modalRef}>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
