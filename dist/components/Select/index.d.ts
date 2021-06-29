import { SelectProps } from "./select";
import { optionProps } from "./option";
import { FC } from "react";
export declare type ISelectComponent = FC<SelectProps> & {
    Option: FC<optionProps>;
};
declare const TransSelect: ISelectComponent;
export default TransSelect;
