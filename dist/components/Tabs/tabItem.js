var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import { useContext } from 'react';
import { TabsContext } from './tabs';
export var TabItem = function (props) {
    var className = props.className, disabled = props.disabled, index = props.index, label = props.label;
    var context = useContext(TabsContext);
    var classes = classNames('ark-tab-item-label', className, {
        'is-tab-active': context.index === index,
        'is-tab-diabled': disabled
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index);
        }
    };
    return (_jsx("div", __assign({ className: classes, onClick: handleClick }, { children: label }), void 0));
};
TabItem.displayName = 'TabItem';
export default TabItem;
