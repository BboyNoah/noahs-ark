import React, { ChangeEvent, KeyboardEvent, FC, useState, useEffect, ReactElement, useRef } from 'react'
import ClassName from 'classnames'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Input, { InputProps } from '../Input/input'
import Icon  from '../Icon/icon'

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 数据过滤方法设置  
  */
  // Promise 类型用以处理异步的返回结果
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**
   * 选择选项时的回调方法
  */
  onSelect?: (item: DataSourceType) => void;
  /**
   * 待选项渲染模版
  */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [hightLightIndex, setHightLightIndex] = useState(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => setShowDropdown(false))
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setShowDropdown(!!data.length)
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        console.log(results)
        setShowDropdown(!!results.length)
        setSuggestions(results)
      }
      
    } else {
      setShowDropdown(false)
    }
    setHightLightIndex(-1)
  }, [debounceValue])

  // const classes = ClassName('', {})
  const highLight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) index = suggestions.length - 1
    setHightLightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestions[hightLightIndex]) {
          handleSelect(suggestions[hightLightIndex])
        }
        break
      case 'ArrowUp':
        highLight(hightLightIndex - 1)
        break
      case 'ArrowDown':
        highLight(hightLightIndex + 1)
        break
      case 'Escape':
        setShowDropdown(false)
        break
      default: 
        break
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    onSelect && onSelect(item)
    triggerSearch.current = false
  }
  const itemTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <Transition 
        in={showDropdown || loading}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => { setSuggestions([]) }}
      >
        <ul className="suggestion-list">
          { 
            loading && 
            <div
             className="suggstions-loading-icon"
             data-testid="test-loading-id"
            >
              <Icon icon="spinner" spin/>
            </div>
          }
          {
            suggestions.map((item, index) => {
              const cName = ClassName('suggestion-item', {
                'is-active': index === hightLightIndex
              })
              return (
                <li
                key={index}
                className={cName}
                onClick={() => handleSelect(item)}
                >
                  {itemTemplate(item)}
                </li>
              )
            })
          }
        </ul>
      </Transition>
    )
  }
  return (
    <div className="ark-auto-complete" ref={componentRef}>
      <Input 
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      { generateDropdown() }
    </div>
  )
}

export default AutoComplete