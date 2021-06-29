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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useState, createContext, useEffect } from 'react';
import ClassName from 'classnames';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
import useClickOutside from '../../hooks/useClickOutside';
import Input from '../Input/input';
export var SelectContext = createContext({
    value: '',
    onSelect: function () { }
});
export var Select = function (props) {
    var onChange = props.onChange, onVisibleChange = props.onVisibleChange, placeholder = props.placeholder, disabled = props.disabled, name = props.name, children = props.children, defaultValue = props.defaultValue, multiple = props.multiple;
    var _a = useState(defaultValue instanceof Array ? '' : defaultValue), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState(defaultValue instanceof Array ? defaultValue : (defaultValue ? [defaultValue] : [])), seletedList = _b[0], setSeletedList = _b[1];
    var _c = useState(false), showDropdown = _c[0], setShowDropdown = _c[1];
    var _d = useState(placeholder), placeholderValue = _d[0], setPlaceholderValue = _d[1];
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () { return setShowDropdown(false); });
    useEffect(function () {
        onVisibleChange && onVisibleChange(showDropdown);
    }, [showDropdown]);
    var cnames = ClassName('ark-select', {
        'select-focus': showDropdown
    });
    var handleSelect = function (selectedValue) {
        if (multiple) {
            var newInputValue = void 0;
            var index = seletedList.findIndex(function (item) { return selectedValue === item; });
            if (index > -1) {
                newInputValue = seletedList.filter(function (item) { return item !== selectedValue; });
            }
            else {
                newInputValue = __spreadArray(__spreadArray([], seletedList), [selectedValue]);
            }
            setSeletedList(newInputValue);
            if (newInputValue.length > 0) {
                setPlaceholderValue('');
            }
            else {
                setPlaceholderValue(placeholder);
            }
            onChange && onChange(selectedValue, newInputValue);
        }
        else {
            setInputValue(selectedValue);
            onChange && onChange(selectedValue, [selectedValue]);
        }
        setShowDropdown(false);
    };
    var handleFocus = function () {
        setShowDropdown(true);
    };
    var passedContext = {
        value: inputValue,
        selected: seletedList,
        onSelect: handleSelect
    };
    var MultipleTag = function () {
        var renderTag = function () {
            return seletedList.map(function (item, index) {
                return (_jsxs("div", __assign({ className: "selected-tag" }, { children: [_jsx("div", __assign({ className: "selected-tag-content" }, { children: item }), void 0),
                        _jsx(Icon, { className: "selectde-tag-icon", icon: "times", onClick: function () { handleSelect(item); } }, void 0)] }), index));
            });
        };
        return (_jsx("div", __assign({ className: "input-area" }, { children: renderTag() }), void 0));
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'Option') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning: Select has a child which is not a Option component');
            }
        });
    };
    var generateDropdown = function () {
        return (_jsx(Transition, __assign({ in: showDropdown, timeout: 300, animation: "zoom-in-top", onExited: function () { } }, { children: _jsx(SelectContext.Provider, __assign({ value: passedContext }, { children: _jsx("ul", __assign({ className: "options-list" }, { children: renderChildren() }), void 0) }), void 0) }), void 0));
    };
    return (_jsxs("div", __assign({ className: cnames, ref: componentRef }, { children: [_jsx(Input, { icon: "chevron-down", value: inputValue, name: name, placeholder: placeholderValue, disabled: disabled, readOnly: true, onFocus: handleFocus }, void 0), multiple && MultipleTag(), generateDropdown()] }), void 0));
};
export default Select;
