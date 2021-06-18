import classNames from 'classnames'
import { useContext } from 'react'
import { TabsContext } from './tabs'

export type LabelType = string | number | React.ReactElement

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
    children?: React.ReactNode
}

export const TabItem: React.FC<TabItemProps> = (props) => {
    const {
        className,
        disabled,
        index,
        label
    } = props
    const context = useContext(TabsContext)
    const classes = classNames('ark-tab-item-label', className, {
        'is-tab-active': context.index === index,
        'is-tab-diabled': disabled
    })
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index)
        }
    }
    return (
        <div className={classes} onClick={handleClick}>
            {label}
        </div>
    )
}

TabItem.displayName = 'TabItem'

export default TabItem