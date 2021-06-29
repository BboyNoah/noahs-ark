import React, { FC, useRef, useState, createContext, useEffect } from 'react'
import ClassName from 'classnames'
import Transition from '../Transition/transition'
import Icon  from '../Icon/icon'
import useClickOutside from '../../hooks/useClickOutside'
import Input, { InputProps } from '../Input/input'
import { optionProps } from './option'

type ValueType = string | string[]

type SelectCallback = (selectedValue: string, selectedValues: string[]) => void

export interface SelectProps extends Omit<InputProps, 'onChange'> {
  /** 指定默认选中的条目 可以是是字符串或者字符串数组 */
  defaultValue?: ValueType;
  /** 选择框默认文字 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否支持多选 */
  multiple?: boolean;
  /** select input 的 name 属性 */
  name?: string;
  /** 选中值发生变化时触发 */
  onChange?: SelectCallback;
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
}

interface ISelectContext {
  value: ValueType;
  selected?: string[];
  onSelect: (selectedValue: string) => void
}

export const SelectContext = createContext<ISelectContext>({
  value: '',
  onSelect: () => {}
})

export const Select: FC<SelectProps> = (props) => {
  const {
    onChange,
    onVisibleChange,
    placeholder,
    disabled,
    name,
    children,
    defaultValue,
    multiple
  } = props
  const [inputValue, setInputValue] = useState(defaultValue instanceof Array ? '' : defaultValue as ValueType)
  const [seletedList, setSeletedList] = useState<string[]>(defaultValue instanceof Array ? defaultValue : (defaultValue ? [defaultValue] : []))
  const [showDropdown, setShowDropdown] = useState(false)
  const [placeholderValue, setPlaceholderValue] = useState(placeholder)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => setShowDropdown(false))

  useEffect(() => {
    onVisibleChange && onVisibleChange(showDropdown)
  }, [showDropdown])
  
  const cnames = ClassName('ark-select', {
    'select-focus': showDropdown
  })

  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      let newInputValue: string[]
      const index = seletedList.findIndex(item => selectedValue === item)
      if(index > -1) {
        newInputValue = seletedList.filter(item => item !== selectedValue)
      } else {
        newInputValue = [...seletedList, selectedValue]
      }
      setSeletedList(newInputValue)
      if (newInputValue.length > 0) {
        setPlaceholderValue('')
      } else {
        setPlaceholderValue(placeholder)
      }
      onChange && onChange(selectedValue, newInputValue)
    } else {
      setInputValue(selectedValue)
      onChange && onChange(selectedValue, [selectedValue])
    }
    setShowDropdown(false)
  }
  const handleFocus = () => {
    setShowDropdown(true)
  }

  const passedContext: ISelectContext = {
    value: inputValue,
    selected: seletedList,
    onSelect: handleSelect
  }

  const MultipleTag = () => {
    const renderTag = () => {
      return seletedList.map((item, index) => {
        return (
          <div className="selected-tag" key={index}>
            <div className="selected-tag-content">{item}</div>
            <Icon className="selectde-tag-icon" icon="times" onClick={() => {handleSelect(item)}} />
          </div>
        )
      })
    }
    return (
      <div className="input-area">
        {renderTag()}
      </div>
    )
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<optionProps>
      const { displayName } = childElement.type
      if (displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Select has a child which is not a Option component')
      }
    })
  }

  const generateDropdown = () => {
    return (
      <Transition 
        in={showDropdown}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => {  }}
      >
        <SelectContext.Provider value={passedContext}>
          <ul className="options-list">
            {renderChildren()}
          </ul>
        </SelectContext.Provider>
        
      </Transition>
    )
  }
  return(
    <div className={cnames} ref={componentRef}>
      <Input
        icon="chevron-down"
        value={inputValue}
        name={name}
        placeholder={placeholderValue}
        disabled={disabled}
        readOnly
        onFocus={handleFocus}
      />
      { multiple && MultipleTag()}
      { generateDropdown() }
    </div>
  )
}

export default Select