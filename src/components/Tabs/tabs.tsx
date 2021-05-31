import React, { useState, createContext} from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

type TabsMode = 'text' | 'border'
type SelectCallBack = (selectIndex: number)=> void

export interface TabsProps {
    defaultIndex?: number;
    mode?: TabsMode;
    onSelect?: SelectCallBack;
    className?: string;
    style?: React.CSSProperties
}

interface ITabsContext {
    index: number;
    onSelect?: SelectCallBack;
    mode?: TabsMode;
}

export const TabsContext = createContext<ITabsContext>({index: 0})

const Tabs: React.FC<TabsProps> = (props) => {
    const {
        defaultIndex,
        mode,
        style,
        className,
        onSelect,
        children
    } = props
    const [ currentActive, setActive ] = useState(defaultIndex)

    const classes = classNames('ark-tabs', className, {})
    const handleSelect = (index: number) => {
        console.log(index)
        setActive(index)
        onSelect && onSelect(index)
    }

    const classesHearder = classNames('ark-tabs-header', {
        'tabs-text': mode === 'text',
        'tabs-border': mode !== 'text',
    })

    const passedContext: ITabsContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleSelect,
        mode
    }


    let tabsContents:any[] = []
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>
            const { displayName } = childElement.type
            if (displayName === 'TabItem') {
                tabsContents.push(childElement.props.children)
                // console.log(childElement.props.children)
                return React.cloneElement(childElement, {
                    index
                })
            } else {
                console.error('Warning: Tabs has a child which is not a TabItem component')
            }
        })
    }

    return (
        <div className={classes} style={style}>
            <div className={classesHearder}>
                <TabsContext.Provider value={passedContext}>
                    {renderChildren()}
                </TabsContext.Provider>
            </div>
            <div className="ark-tabs-body">
                {tabsContents[currentActive ? currentActive : 0]}
            </div>
        </div>
    )
}

Tabs.defaultProps = {
    defaultIndex: 0,
    mode: 'text'
}

export default Tabs