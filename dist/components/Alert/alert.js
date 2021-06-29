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
import { useState } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
export var Alert = function (props) {
    var _a;
    var _b = useState(true), show = _b[0], setShow = _b[1];
    var title = props.title, type = props.type, description = props.description, closable = props.closable, style = props.style, onClose = props.onClose;
    var classes = classNames('alert', (_a = {},
        _a["alert-" + type] = type,
        _a));
    return (_jsx(Transition, __assign({ animation: "zoom-in-top", timeout: 500, in: show }, { children: _jsxs("div", __assign({ className: classes, style: style, "data-testid": "test-alert-id" }, { children: [_jsxs("div", __assign({ className: "alert-header" }, { children: [_jsx("div", __assign({ className: "alert-title" }, { children: title }), void 0),
                        closable ? _jsx("div", __assign({ className: "alert-close-btn iconfont", onClick: function () { setShow(false); onClose && onClose(); } }, { children: "\uE6D5" }), void 0) : ''] }), void 0),
                _jsx("div", __assign({ className: "alert-desc" }, { children: description }), void 0)] }), void 0) }), void 0));
};
Alert.defaultProps = {
    type: "default",
    closable: true
};
export default Alert;
