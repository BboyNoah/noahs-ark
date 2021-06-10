import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tabs,  { TabsProps } from './tabs';
import TabItem ,  { TabItemProps } from './tabItem';

export default {
  title: 'Noah-Ark/Tabs',
  component: Tabs,
  subcomponents: { TabItem },
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

export const DefaultTabs: Story<TabsProps> = (args) => {
  return (
    <Tabs {...args}>
      <TabItem label={<div>element tab item</div>}>element tab item content</TabItem>
      <TabItem label="disabled item" disabled>disabled item content</TabItem>
      <TabItem label="tab item">tab item content</TabItem>
    </Tabs>
  )
}

DefaultTabs.storyName = '默认 Tabs'

export const BorderTabs: Story<TabsProps> = (args) => {
  return (
    <Tabs {...args}>
      <TabItem label={<div>element tab item</div>}>element tab item content</TabItem>
      <TabItem label="disabled item" disabled>disabled item content</TabItem>
      <TabItem label="tab item">tab item content</TabItem>
    </Tabs>
  )
}

BorderTabs.args = {
  mode: 'border'
}

BorderTabs.storyName = '带边框 Tabs'