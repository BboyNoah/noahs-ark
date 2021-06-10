import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import { Icon } from '../Icon/icon'

type InputSize = 'lg' | 'sm'

// Omit 忽略泛型中的值；原生的input中已经有size属性，且接收的类型为number，所以要忽略掉
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用 Input */
  disabled?: boolean;
  /** 设置 Input 尺寸 */
  size?: InputSize;
  /** Input 内部右侧显示图标 */
  icon?: IconProp;
  /** Input 添加前缀 */
  prepend?: string | ReactElement;
  /** Input 添加后缀 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  const classes = classNames('ark-input', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': prepend,
    'input-group-append': append,
    'input-with-icon': icon
  })
  return (
    <div
     className={classes}
     style={style}
    >
      { prepend && <div className="input-group-prepend-wrapper">{prepend}</div> }
      { icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div> }
      <input
        className="input-inner"
        disabled={disabled}
        {...restProps} 
      />
      { append && <div className="input-group-append-wrapper">{append}</div> }
    </div>
  )
}

export default Input