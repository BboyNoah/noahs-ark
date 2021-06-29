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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var TabsContext = createContext({ index: 0 });
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, mode = props.mode, style = props.style, className = props.className, onSelect = props.onSelect, children = props.children;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('ark-tabs', className, {});
    var handleSelect = function (index) {
        console.log(index);
        setActive(index);
        onSelect && onSelect(index);
    };
    var classesHearder = classNames('ark-tabs-header', {
        'tabs-text': mode === 'text',
        'tabs-border': mode !== 'text',
    });
    var passedContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleSelect,
        mode: mode
    };
    var tabsContents = [];
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabItem') {
                tabsContents.push(childElement.props.children);
                // console.log(childElement.props.children)
                return React.cloneElement(childElement, {
                    index: index
                });
            }
            else {
                console.error('Warning: Tabs has a child which is not a TabItem component');
            }
        });
    };
    return (_jsxs("div", __assign({ className: classes, style: style }, { children: [_jsx("div", __assign({ className: classesHearder }, { children: _jsx(TabsContext.Provider, __assign({ value: passedContext }, { children: renderChildren() }), void 0) }), void 0),
            _jsx("div", __assign({ className: "ark-tabs-body" }, { children: tabsContents[currentActive ? currentActive : 0] }), void 0)] }), void 0));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    mode: 'text'
};
export default Tabs;
