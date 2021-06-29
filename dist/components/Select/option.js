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
import { useContext } from 'react';
import classNames from 'classnames';
import { SelectContext } from './select';
import Icon from '../Icon/icon';
export var Option = function (props) {
    var _a, _b;
    var disabled = props.disabled, value = props.value, label = props.label;
    var context = useContext(SelectContext);
    var classes = classNames('ark-select-option', {
        'is-disabled': disabled,
        'is-selected': (_a = context.selected) === null || _a === void 0 ? void 0 : _a.includes(value),
        'is-actived': context.value === value
    });
    var handleClick = function () {
        var _a;
        if (!disabled && !((_a = context.selected) === null || _a === void 0 ? void 0 : _a.includes(value))) {
            context.onSelect(value);
        }
    };
    return (_jsxs("li", __assign({ className: classes, onClick: handleClick }, { children: [_jsx("div", __assign({ className: "option-content" }, { children: label ? label : value }), void 0),
            ((_b = context.selected) === null || _b === void 0 ? void 0 : _b.includes(value)) ? _jsx(Icon, { icon: "check" }, void 0) : ''] }), void 0));
};
Option.displayName = 'Option';
export default Option;
