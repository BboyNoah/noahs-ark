import classNames from 'classnames'
import { useContext } from 'react'
import { TabsContext } from './tabs'

export type LabelType = string | number | React.ReactElement

export interface TabItemProps {
    index?: number;
    label: LabelType;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode
}

const TabItem: React.FC<TabItemProps> = (props) => {
    const {
        className,
        disabled,
        children,
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