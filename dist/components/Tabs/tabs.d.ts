import React from 'react';
declare type TabsMode = 'text' | 'border';
declare type SelectCallBack = (selectIndex: number) => void;
export interface TabsProps {
    /**
     * 默认显示的子元素序号，从 0 开始
     */
    defaultIndex?: number;
    /**
     * 模式，文字模式和边框模式
     */
    mode?: TabsMode;
    /**
     * 点击 Tab 标题项的回调
     */
    onSelect?: SelectCallBack;
    className?: string;
    style?: React.CSSProperties;
}
interface ITabsContext {
    index: number;
    onSelect?: SelectCallBack;
    mode?: TabsMode;
}
export declare const TabsContext: React.Context<ITabsContext>;
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
