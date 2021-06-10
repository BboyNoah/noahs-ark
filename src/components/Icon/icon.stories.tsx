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
themeIcon.storyName = '基于 Font Awesome Icon'

export const IconThemes:Story<IconProps> = () => {
  return (
    <>
      <Icon style={{margin: '5px'}} theme="primary" icon="at" />
      <Icon style={{margin: '5px'}} theme="danger" icon="ban" />
      <Icon style={{margin: '5px'}} theme="info" icon="info" />
      <Icon style={{margin: '5px'}} theme="secondary" icon="star" />
      <Icon style={{margin: '5px'}} theme="success" icon="check" />
      <Icon style={{margin: '5px'}} theme="warning" icon="bell-exclamation" />
    </>
  )
};
IconThemes.storyName = 'Icon 主题色'
