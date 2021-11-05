import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Label from '../../atoms/Label'

import { ReactComponent as DropArrow } from '../../../assets/images/drop-arrow.svg'

import { IController } from '../../../interface/input'

import './styles.scss'

type GenderType = {
  id: string
  gender: string
}

interface ISelect extends IController {
  options: GenderType[]
  placeholder: string
  errorText?: string
  label: string
}

const Select: React.FC<ISelect> = ({ onChange, name, innerRef, options, placeholder = 'Select', label, errorText }) => {
  const [value, setValue] = useState(placeholder)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const dropdownContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkOutsideClick = (e: MouseEvent) => {
      if (isDropdownOpen && dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', checkOutsideClick)

    return () => {
      document.removeEventListener('mousedown', checkOutsideClick)
    }
  })

  return (
    <>
      <div>
        <Label labelText={label} />
      </div>
      <div ref={dropdownContainerRef} className="select">
        <div
          onClick={() => {
            setIsDropdownOpen((prev) => !prev)
          }}
          className={cn('select__main-item', {
            'select__main-item_selected': value !== placeholder,
            'select__main-item_active': isDropdownOpen,
            'select__main-item_error': errorText
          })}
        >
          {value}
          <DropArrow className={cn('select__arrow-icon', { 'select__arrow-icon_active': isDropdownOpen })} />
        </div>
        <div className={cn('dropdown-container', { 'dropdown-container_open': isDropdownOpen })}>
          {options?.map(({ id, gender }) => {
            return (
              <div key={`gender_${id}`}>
                <label className="dropdown-container__item" htmlFor={`gender_${id}`}>
                  {gender}
                </label>
                <input
                  className="dropdown-container__radio_hidden"
                  type="radio"
                  name={name}
                  value={id}
                  id={`gender_${id}`}
                  data-name={gender}
                  onClick={() => {
                    setIsDropdownOpen((prev) => !prev)
                  }}
                  onChange={(e) => {
                    onChange && onChange(e)
                    setValue(e.target.getAttribute('data-name') as string)
                  }}
                  ref={innerRef}
                />
              </div>
            )
          })}
        </div>
        <div className="select__error-label">{errorText}</div>
      </div>
    </>
  )
}

export default Select
