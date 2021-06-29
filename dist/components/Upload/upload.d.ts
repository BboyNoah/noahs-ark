import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /**
     * 上传接口地址
     */
    action: string;
    /**
     * 初始化上传组件时预设的数据
     */
    defaulFileList?: UploadFile[];
    /**
     * 生命周期：文件上传进度钩子函数
     */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**
     * 生命周期：文件上传成功钩子函数
     */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**
     * 生命周期：文件上传失败钩子函数
     */
    onError?: (err: any, file: UploadFile) => void;
    /**
     * 生命周期：文件状态改变时钩子函数，上传成功或者失败时都会被调用
     */
    onChange?: (file: UploadFile) => void;
    /**
     * 生命周期：文件上传前钩子函数，参数为上传的文件，若返回 false 或者 Promise.reject 则停止上传。
     */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**
     * 生命周期：文件从列表删除时的回调
     */
    onRemove?: (file: UploadFile) => void;
    /**
     * 接口请求头定义，参考axios headers 参数
     */
    headers?: {
        [key: string]: any;
    };
    /**
     * 提交数据时Formdata 中的name 属性，即上传的文件字段名
     */
    name?: string;
    /**
    * 提交数据时附带的额外参数
    */
    data?: {
        [key: string]: any;
    };
    /**
     * 设置发送 cookie 凭证信息
     */
    withCredentials?: boolean;
    /**
     * 设置多选文件
     */
    multiple?: boolean;
    /**
     * 设置接受上传的文件类型
     */
    accept?: string;
    /**
     * 设置拖拽上传
     */
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
