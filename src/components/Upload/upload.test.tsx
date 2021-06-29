import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import axios from 'axios'
import Upload, { UploadProps } from './upload'


// mock 了 icon 组件，使原本显示icon 变成显示 span 加 传入的icon 名称的节点
jest.mock('../Icon/icon', () => {
  return ({icon, onClick}: {icon: string; onClick: () => void}) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')
// axios.post.mockImplementation 无法识别，所以加个类型断言
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fackUrl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement

//模拟一个文件
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})

describe('test Upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>upload file</Upload>)
    fileInput = wrapper.container.querySelector('.ark-hide-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('upload file') as HTMLElement
  })
  it('Upload process should works fine', async () => {
    // 类似劫持了Axios 中的post 方法，这时再调用axios 的post 方法会直接返回自己定义的返回体
    // 繁琐版
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'nice'})
    // })
    // 快捷版，直接返回resolve 状态的Promise 
    mockedAxios.post.mockResolvedValue({'data': 'nice'})

    // 渲染
    const { queryByText } = wrapper
    expect(fileInput).not.toBeVisible()
    expect(uploadArea).toBeInTheDocument()

    // 点击上传
    // 相当于触发input 的change 事件同时修改事件参数 e 中的target 中的files 为自己模拟的文件对象，如同从e.target.files中取文件一样的道理
    fireEvent.change(fileInput, {target: { files: [testFile] }})
    // expect(testProps.onChange).toHaveBeenCalled()

    // 上传中
    expect(queryByText('spinner')).toBeInTheDocument()
    const fileNameNode = await wrapper.findByText('test.png')
    expect(fileNameNode).toBeInTheDocument()

    // 上传成功
    expect(queryByText('check-circle')).toBeInTheDocument()

    // 回调
    expect(testProps.onSuccess).toHaveBeenCalledWith('nice', expect.objectContaining({
      name: 'test.png',
      raw: testFile
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test.png',
      raw: testFile
    }))

    // 移除
    const removeBtn = queryByText('times')
    expect(removeBtn).toBeInTheDocument()
    fireEvent.click(removeBtn as HTMLElement)
    expect(fileNameNode).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test.png',
      raw: testFile,
      status: 'success'
    }))
  })

  it('drag and drop should works fine', async () =>{
    mockedAxios.post.mockResolvedValue({'data': 'nice'})
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    fireEvent.drop(uploadArea, {dataTransfer: { files: [testFile] }})
    // 上传中
    expect(wrapper.queryByText('spinner')).toBeInTheDocument()
    const fileNameNode = await wrapper.findByText('test.png')
    expect(fileNameNode).toBeInTheDocument()
    // 上传成功
    expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    // 回调
    expect(testProps.onSuccess).toHaveBeenCalledWith('nice', expect.objectContaining({
      name: 'test.png',
      raw: testFile
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test.png',
      raw: testFile
    }))
  })

})