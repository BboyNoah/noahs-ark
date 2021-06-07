import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    /**
     * 自定义类名
    */
    className?: string;
    /**
     * 禁用按钮
    */
    disabled?: boolean;
    /**
     * 按钮尺寸
    */
    size?: ButtonSize;
    /**
     * 按钮类型
    */
    btnType?: ButtonType;
    children: React.ReactNode;
    /**
     * 按钮类型类型为 type 时必须传入该值
    */
    href?: string;
    /**
     * 点击事件
    */
    onClick?: () => void;
}
// 拿到 botton 标签 原生属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// 拿到 a 标签 原生属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

// Partial 使属性变为可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === "link") && disabled
    })
    if (btnType === "link" && href) {
        return (
            <a
             className={classes}
             href={href}
             {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
             className={classes}
             disabled={disabled}
             {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: "default"
}

export default Button