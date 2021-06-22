import { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import { Dragger } from './dragger'

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
  headers?: {[key: string]: any};
  /**
   * 提交数据时Formdata 中的name 属性，即上传的文件字段名
   */
   name?: string;
   /**
   * 提交数据时附带的额外参数
   */
  data?: {[key: string]: any};
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
  accept: string;
  /**
   * 设置拖拽上传
   */
   drag: boolean;
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
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    multiple,
    accept,
    children,
    drag
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaulFileList || [])

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
    console.log(postFiles)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        postMethod(file)
      } else {
        const result = (beforeUpload && beforeUpload(file))
        if (result && result instanceof Promise) {
          result.then(processFile => {
            postMethod(processFile)
          })
        } else if (result !== false) {
          postMethod(file)
        }
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
    // 多次异步中这样更新fileList会导致最终数据不正确
    // setFileList([_file, ...fileList])
    // 所以要用回调的方式更新
    setFileList((prevList) => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: withCredentials,
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
    console.log("选择文件")
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  // console.log(fileList)
  return (
    <div className="ark-upload">
      {/* <Button btnType="primary" onClick={handleClick}>点击上传</Button> */}
      <div
        className="ark-upload-input"
        onClick={handleClick}
      >
        {
          drag ? 
          <Dragger
            onFile={files => {uploadFiles(files)}}
          >
            {children}
          </Dragger>
          :
          children
        }
        
      </div>
      <input
       type="file"
       ref={fileInput}
       style={{display: 'none'}}
       onChange={handleFileChange}
       multiple={multiple}
       accept={accept}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload