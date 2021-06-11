import React, { ChangeEvent, FC, useState, useEffect, ReactElement } from 'react'
import ClassName from 'classnames'
import useDebounce from '../../hooks/useDebounce'
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
  const debounceValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debounceValue) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setSuggestions(data)
          setLoading(false)
        })
      } else {
        setSuggestions(results)
      }
      
    } else {
      setSuggestions([])
    }
  }, [debounceValue])

  const classes = ClassName('', {})
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect && onSelect(item)
  }
  const itemTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {
          suggestions.map((item, index) => {
            return (
              <li key={index} onClick={() => handleSelect(item)}>
                {itemTemplate(item)}
              </li>
            )
          })
        }
      </ul>
    )
  }
  return (
    <>
      <div className="ark-auto-complete">
        <Input 
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />
        { loading && <ul><Icon icon="spinner" spin /></ul> }
        { (suggestions.length > 0) && generateDropdown() }
      </div>
      
    </>
  )
}

export default AutoComplete