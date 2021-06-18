import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import Upload,  { UploadProps } from './upload';

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

const checkFileSize = (file: File) => {
  if(Math.round(file.size / 1024) > 50) {
    alert('file size should less than 50kb')
    return false
  }
  return true
}

const template: Story<UploadProps> = (args) => {
  return (
    <Upload {...args} />
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