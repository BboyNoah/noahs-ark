import React from 'react';
import { Story, Meta } from '@storybook/react';
import Icon,  { IconProps } from './icon';

export default {
  title: 'Noah-Ark/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const themeIcon = Template.bind({});
themeIcon.args = {
  theme: 'primary',
  icon: 'star'
};
themeIcon.storyName = '风格 Icon'

export const IconThemes:Story<IconProps> = () => {
  return (
    <>
      <Icon theme="primary" icon="at" />
      <Icon theme="danger" icon="ban" />
      <Icon theme="info" icon="info" />
      <Icon theme="secondary" icon="star" />
      <Icon theme="success" icon="check" />
      <Icon theme="warning" icon="bell-exclamation" />
    </>
  )
};
IconThemes.storyName = 'Icon 主题'
