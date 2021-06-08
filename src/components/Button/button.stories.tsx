import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button,  { ButtonProps } from './button';

export default {
  title: 'Noah-Ark/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} >button</Button>;

export const Default = Template.bind({});
Default.args = {
  btnType: 'default'
};
Default.storyName = '默认 Button'

export const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  href: 'www.baidu.com'
};
Link.storyName = '链接 Button'

export const BtnType:Story<ButtonProps> = () => {
  return (
    <>
      <Button btnType="default">default</Button>
      <Button btnType="primary">primary</Button>
      <Button btnType="danger">danger</Button>
      <Button btnType="link" href="www.baidu.com">danger</Button>
    </>
  )
};
BtnType.storyName = 'Button 类型'
