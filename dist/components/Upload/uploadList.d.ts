import React from "react";
import { UploadFile } from "./upload";
export interface UploadListProp {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: React.FC<UploadListProp>;
export default UploadList;
