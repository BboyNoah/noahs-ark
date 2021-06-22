import React from "react";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
import { UploadFile } from "./upload";

export interface UploadList {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void
}

export const UploadList: React.FC<UploadList> = (props) => {
  const {
    fileList,
    onRemove
  } = props
  const generateList = (list: UploadFile[]) => {
    return list.map(item => {
      return (
        <li className="upload-list-item" key={item.uid}>
          <span className={`file-name file-name-${item.status}`}>
            <Icon icon="file-alt" theme="secondary" />
            {item.name}
          </span>
          <span className="file-status">
            {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
            {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
            {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
          </span>
          <span className="file-actions">
            <Icon icon="times" onClick={() => { onRemove(item) }} />
          </span>
          {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
        </li>
      )
    })
  }
  return (
    <ul className="upload-list">
      {generateList(fileList)}
    </ul>
  )
}

export default UploadList