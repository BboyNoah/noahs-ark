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
import Button from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MemuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
function App() {
    var alertStyleObj = {
        margin: '5px'
    };
    var fn = function () {
        return (_jsx(Alert, { title: "\u6D4B\u8BD5", type: "warning", onClose: function () { alert(123); }, style: alertStyleObj }, void 0));
    };
    return (_jsxs("div", __assign({ className: "App" }, { children: [_jsxs("div", { children: [_jsx(Button, { children: " hello " }, void 0),
                    _jsx(Button, __assign({ btnType: "primary", size: "lg" }, { children: " hello " }), void 0),
                    _jsx(Button, __assign({ btnType: "danger" }, { children: " danger " }), void 0),
                    _jsx(Button, __assign({ btnType: "danger", disabled: true, size: "sm" }, { children: " danger " }), void 0),
                    _jsx(Button, __assign({ btnType: "link", href: "http://baidu.com" }, { children: " baidu link " }), void 0),
                    _jsx(Button, __assign({ btnType: "link", href: "http://baidu.com", disabled: true }, { children: " baidu link " }), void 0),
                    _jsx(Button, __assign({ onClick: function () {
                            fn();
                        } }, { children: " hello " }), void 0)] }, void 0),
            _jsx("hr", {}, void 0),
            _jsxs("div", { children: [_jsx(Alert, { title: "this is a alert", style: alertStyleObj }, void 0),
                    _jsx(Alert, { title: "this is a alert", type: "success", style: alertStyleObj }, void 0),
                    _jsx(Alert, { title: "this is a alert", type: "danger", style: alertStyleObj }, void 0),
                    _jsx(Alert, { title: "this is a alert", type: "warning", onClose: function () { alert(123); }, style: alertStyleObj }, void 0),
                    _jsx(Alert, { title: "this is a alert", closable: false, style: alertStyleObj }, void 0),
                    _jsx(Alert, { title: "this is a alert", description: "this is description", style: alertStyleObj }, void 0)] }, void 0),
            _jsx("hr", {}, void 0),
            _jsxs("div", { children: [_jsxs(Menu, __assign({ onSelect: function (index) { console.log(index); } }, { children: [_jsx(MemuItem, { children: "item 1" }, void 0),
                            _jsx(MemuItem, { children: "item 2" }, void 0),
                            _jsx(MemuItem, __assign({ disabled: true }, { children: "link 3" }), void 0),
                            _jsxs(SubMenu, __assign({ title: "dropdown" }, { children: [_jsx(MemuItem, { children: "subitem 1" }, void 0),
                                    _jsx(MemuItem, { children: "subitem 2" }, void 0),
                                    _jsx(MemuItem, { children: "subitem 3" }, void 0)] }), void 0),
                            _jsx(MemuItem, { children: "item 4" }, void 0)] }), void 0),
                    _jsxs(Menu, __assign({ mode: 'vertical', defaultOpenSubMenus: ['3'], style: { marginLeft: '30px' }, onSelect: function (index) { console.log(index); } }, { children: [_jsx(MemuItem, { children: "item 1" }, void 0),
                            _jsx(MemuItem, { children: "item 2" }, void 0),
                            _jsx(MemuItem, __assign({ disabled: true }, { children: "link 3" }), void 0),
                            _jsxs(SubMenu, __assign({ title: "dropdown" }, { children: [_jsx(MemuItem, { children: "subitem 1" }, void 0),
                                    _jsx(MemuItem, { children: "subitem 2" }, void 0),
                                    _jsx(MemuItem, { children: "subitem 3" }, void 0)] }), void 0),
                            _jsx(MemuItem, { children: "item 4" }, void 0)] }), void 0)] }, void 0),
            _jsx("hr", {}, void 0),
            _jsxs("div", { children: [_jsxs(Tabs, { children: [_jsx(TabItem, __assign({ label: _jsx("div", { children: "bbb" }, void 0) }, { children: "123" }), void 0),
                            _jsx(TabItem, __assign({ label: "test", disabled: true }, { children: "456" }), void 0),
                            _jsx(TabItem, __assign({ label: "test" }, { children: "789" }), void 0)] }, void 0),
                    _jsxs(Tabs, __assign({ mode: "border" }, { children: [_jsx(TabItem, __assign({ label: _jsx("div", { children: "bbb" }, void 0), disabled: true }, { children: "123" }), void 0),
                            _jsx(TabItem, __assign({ label: "test" }, { children: "456" }), void 0),
                            _jsx(TabItem, __assign({ label: "test" }, { children: "789" }), void 0)] }), void 0)] }, void 0)] }), void 0));
}
export default App;
