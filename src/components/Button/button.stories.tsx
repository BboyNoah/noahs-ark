import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button,  { ButtonProps } from './button';

export default {
  title: 'Example/按钮 - Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} >button</Button>;

/**
 * ## Button 组件
 * ~~~js
 * import Button from 'noah-ark'
 * ~~~
 */
// ???
export const Default = Template.bind({});
Default.args = {
  btnType: 'default'
};
Default.storyName = 'Button'

const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  href: 'www.baidu.com'
};

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
BtnType.storyName = '按钮类型'
