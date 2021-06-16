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

export const DefaultUpload: Story<UploadProps> = (args) => {
  return (
    <Upload />
  )
}

DefaultUpload.storyName = '默认 Upload'