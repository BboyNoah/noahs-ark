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
import { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import { Dragger } from './dragger';
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, beforeUpload = props.beforeUpload, defaulFileList = props.defaulFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, multiple = props.multiple, accept = props.accept, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaulFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (preFileList) {
            return preFileList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current)
            fileInput.current.click();
    };
    var uploadFiles = function (files) {
        //files 是fileList类型，类数组对象，通过Array.from 转为数组
        var postFiles = Array.from(files);
        console.log(postFiles);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                postMethod(file);
            }
            else {
                var result = (beforeUpload && beforeUpload(file));
                if (result && result instanceof Promise) {
                    result.then(function (processFile) {
                        postMethod(processFile);
                    });
                }
                else if (result !== false) {
                    postMethod(file);
                }
            }
        });
    };
    var postMethod = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file
        };
        // 多次异步中这样更新fileList会导致最终数据不正确
        // setFileList([_file, ...fileList])
        // 所以要用回调的方式更新
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    // 由于setFileList 是异步的，这里不能直接setFileList(file)
                    updateFileList(_file, {
                        status: 'uploading',
                        percent: percentage
                    });
                    onProgress && onProgress(percentage, _file);
                }
            }
        }).then(function (res) {
            updateFileList(_file, {
                status: 'success',
                response: res
            });
            onSuccess && onSuccess(res.data, _file);
            onChange && onChange(_file);
        }).catch(function (err) {
            updateFileList(_file, {
                status: 'error',
                error: err
            });
            onError && onError(err, _file);
            onChange && onChange(_file);
        });
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        console.log("选择文件");
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    // console.log(fileList)
    return (_jsxs("div", __assign({ className: "ark-upload" }, { children: [_jsx("div", __assign({ className: "ark-upload-input", onClick: handleClick }, { children: drag ?
                    _jsx(Dragger, __assign({ onFile: function (files) { uploadFiles(files); } }, { children: children }), void 0)
                    :
                        children }), void 0),
            _jsx("input", { type: "file", className: "ark-hide-input", ref: fileInput, style: { display: 'none' }, onChange: handleFileChange, multiple: multiple, accept: accept }, void 0),
            _jsx(UploadList, { fileList: fileList, onRemove: handleRemove }, void 0)] }), void 0));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
