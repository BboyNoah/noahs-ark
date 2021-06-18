import { useContext } from 'react'
import classNames from 'classnames'
import { SelectContext } from './select'
import Icon  from '../Icon/icon'

export interface optionProps {
  index?: string;
  disabled?: boolean;
  value: string;
  label?: string;
}

export const Option: React.FC<optionProps> = (props) => {
  const {
    index,
    disabled,
    value,
    label
  } = props
  const context = useContext(SelectContext)
  const classes = classNames('ark-select-option', {
    'is-disabled': disabled,
    'is-selected': context.selected?.includes(value),
    'is-actived': context.value === value
  })
  const handleClick = () => {
    if (!disabled && !context.selected?.includes(value)) {
      context.onSelect(value)
    }
  }
  return (
    <li
      className={classes}
      onClick={handleClick}
    >
      <div className="option-content">
        {label ? label : value}
      </div>
      {
        context.selected?.includes(value) ? <Icon icon="check" /> : ''
      }
    </li>
  )
}

Option.displayName = 'Option'

export default Option