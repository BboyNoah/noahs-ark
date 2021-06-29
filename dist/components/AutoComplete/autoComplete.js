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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import ClassName from 'classnames';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Input from '../Input/input';
import Icon from '../Icon/icon';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), hightLightIndex = _d[0], setHightLightIndex = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debounceValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () { return setShowDropdown(false); });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setShowDropdown(!!data.length);
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                console.log(results);
                setShowDropdown(!!results.length);
                setSuggestions(results);
            }
        }
        else {
            setShowDropdown(false);
        }
        setHightLightIndex(-1);
    }, [debounceValue]);
    // const classes = ClassName('', {})
    var highLight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHightLightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'Enter':
                if (suggestions[hightLightIndex]) {
                    handleSelect(suggestions[hightLightIndex]);
                }
                break;
            case 'ArrowUp':
                highLight(hightLightIndex - 1);
                break;
            case 'ArrowDown':
                highLight(hightLightIndex + 1);
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        onSelect && onSelect(item);
        triggerSearch.current = false;
    };
    var itemTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (_jsx(Transition, __assign({ in: showDropdown || loading, timeout: 300, animation: "zoom-in-top", onExited: function () { setSuggestions([]); } }, { children: _jsxs("ul", __assign({ className: "suggestion-list" }, { children: [loading &&
                        _jsx("div", __assign({ className: "suggstions-loading-icon", "data-testid": "test-loading-id" }, { children: _jsx(Icon, { icon: "spinner", spin: true }, void 0) }), void 0),
                    suggestions.map(function (item, index) {
                        var cName = ClassName('suggestion-item', {
                            'is-active': index === hightLightIndex
                        });
                        return (_jsx("li", __assign({ className: cName, onClick: function () { return handleSelect(item); } }, { children: itemTemplate(item) }), index));
                    })] }), void 0) }), void 0));
    };
    return (_jsxs("div", __assign({ className: "ark-auto-complete", ref: componentRef }, { children: [_jsx(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps), void 0), generateDropdown()] }), void 0));
};
export default AutoComplete;
