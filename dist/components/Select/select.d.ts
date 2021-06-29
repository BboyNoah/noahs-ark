import React, { FC } from 'react';
import { InputProps } from '../Input/input';
declare type ValueType = string | string[];
declare type SelectCallback = (selectedValue: string, selectedValues: string[]) => void;
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
    onVisibleChange?: (visible: boolean) => void;
}
interface ISelectContext {
    value: ValueType;
    selected?: string[];
    onSelect: (selectedValue: string) => void;
}
export declare const SelectContext: React.Context<ISelectContext>;
export declare const Select: FC<SelectProps>;
export default Select;
