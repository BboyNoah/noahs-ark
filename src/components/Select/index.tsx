import Select, { SelectProps } from "./select";
import Option, { optionProps } from "./option";
import { FC } from "react";

export type ISelectComponent = FC<SelectProps> & {
  Option: FC<optionProps>
}

const TransSelect = Select as ISelectComponent
TransSelect.Option = Option

export default TransSelect;