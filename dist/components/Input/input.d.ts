import { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
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
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare const Input: FC<InputProps>;
export default Input;
