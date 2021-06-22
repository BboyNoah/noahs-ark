import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import Button from '../Button/button';
import Upload,  { UploadProps, UploadFile } from './upload';

export default {
  title: 'Noah-Ark/Upload',
  component: Upload,
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

const defaultList: UploadFile[] = [{
  uid: '123',
  size: 500,
  name: 'test',
  status: 'error',
}, {
  uid: '456',
  size: 500,
  name: 'no',
  status: 'success'
}, {
  uid: '789',
  size: 500,
  name: 'haha',
  status: 'ready'
}, {
  uid: '333',
  size: 500,
  name: 'haha',
  status: 'uploading',
  percent: 30
}]

const checkFileSize = (file: File) => {
  if(Math.round(file.size / 1024) > 50) {
    alert('file size should less than 50kb')
    return false
  }
  return true
}

const template: Story<UploadProps> = (args) => {
  return (
    <Upload {...args} >
      <Button btnType="primary">点击上传</Button>
    </Upload>
  )
}

export const DefaultUpload = template.bind({})

DefaultUpload.args = {
  action: "http://jsonplaceholder.typicode.com/posts"
}

DefaultUpload.storyName = '默认 Upload'

export const LimitUpload = template.bind({})

LimitUpload.args = {
  action: "http://jsonplaceholder.typicode.com/posts",
  beforeUpload: checkFileSize,
  onChange: action('change')
}

LimitUpload.storyName = '限制文件大小 Upload'

export const ListUpload = template.bind({})

ListUpload.args = {
  action: "http://jsonplaceholder.typicode.com/posts",
  onChange: action('change'),
  defaulFileList: defaultList,
  multiple: true,
  accept: '.jpg'
}

ListUpload.storyName = '带列表 Upload'

const DragUploadArgs:UploadProps = {
  action: "http://jsonplaceholder.typicode.com/posts",
  onChange: action('change'),
  multiple: true,
  accept: '.jpg',
  drag: true
}

export const DragUpload = () => {
  return (
    <Upload {...DragUploadArgs} >
    </Upload>
  )
}

DragUpload.storyName = '拖拽上传 Upload'