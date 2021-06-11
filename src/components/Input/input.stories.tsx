import React from 'react';
import { Story, Meta } from '@storybook/react';
import Input,  { InputProps } from './input';

export default {
  title: 'Noah-Ark/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
// Default.args = {
//   btnType: 'default'
// };
Default.storyName = '默认 Input'

export const WithPrepend = Template.bind({});
WithPrepend.args = {
  prepend: 'prepend'
};
WithPrepend.storyName = '带前缀 Input'

export const WithAppend = Template.bind({});
WithAppend.args = {
  append: 'append'
};
WithAppend.storyName = '带后缀 Input'

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: "check"
};
WithIcon.storyName = '带图标 Input'
