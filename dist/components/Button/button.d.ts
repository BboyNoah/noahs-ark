import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
declare type ButtonSize = 'lg' | 'sm';
declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
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
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
