/// <reference types="react" />
export declare type LabelType = string | number | React.ReactElement;
export interface TabItemProps {
    /**
     * 序号，不可重复
     */
    index?: number;
    /**
     * Tab 标题显示的内容，支持 HTML 元素
     */
    label: LabelType;
    /**
     * 禁用标题元素，不可点击
     */
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
