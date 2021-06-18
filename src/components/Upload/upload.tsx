import { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

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
  action: string;
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
  onRemove?: (file: UploadFile) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    onChange,
    beforeUpload,
    defaulFileList,
    onRemove
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(preFileList => {
      return preFileList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj}
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) fileInput.current.click()
  }

  const uploadFiles = (files: FileList) => {
    //files 是fileList类型，类数组对象，通过Array.from 转为数组
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        postMethod(file)
      }
      const result = (beforeUpload && beforeUpload(file))
      if (result && result instanceof Promise) {
        result.then(processFile => {
          postMethod(processFile)
        })
      } else if (result !== false) {
        postMethod(file)
      }
    })
  }

  const postMethod = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          // 由于setFileList 是异步的，这里不能直接setFileList(file)
          updateFileList(_file, {
            status: 'uploading',
            percent: percentage
          })
          onProgress && onProgress(percentage, _file)
        }
      }
    }).then(res => {
      updateFileList(_file, {
        status: 'success',
        response: res
      })
      onSuccess && onSuccess(res.data, _file)
      onChange && onChange(_file)
    }).catch(err => {
      updateFileList(_file, {
        status: 'error',
        error: err
      })
      onError && onError(err, _file)
      onChange && onChange(_file)
    })
  }

  const handleFileChange= (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  console.log(fileList)
  return (
    <div className="ark-upload">
      <Button btnType="primary" onClick={handleClick}>点击上传</Button>
      <input
       type="file"
       ref={fileInput}
       style={{display: 'none'}}
       onChange={handleFileChange}
      />
    </div>
  )
}

export default Upload