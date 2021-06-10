import React from 'react';
import { Story, Meta } from '@storybook/react';
import Menu,  { MenuProps } from './menu';
import MenuItem ,  { MenuItemProps } from './menuItem';
import SubMenu, { SubMenuProps } from './subMenu';

export default {
  title: 'Noah-Ark/Menu',
  component: Menu,
  subcomponents: { MenuItem, SubMenu },
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

export const DefaultMenu: Story<MenuProps> = (args) => {
    return (
        <Menu {...args}>
            <MenuItem disabled={false}>MenuItem</MenuItem>
            <MenuItem disabled={true}>Disabled MenuItem</MenuItem>
            <SubMenu title="SubMenu">
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
                <MenuItem>Item 3</MenuItem>
            </SubMenu>
            <MenuItem disabled={false}>MenuItem</MenuItem>
        </Menu>
    )
}
DefaultMenu.storyName = '默认 Menu'

export const VerticalMenu: Story<MenuProps> = (args) => {
    return (
        <Menu {...args}>
            <MenuItem disabled={false}>MenuItem</MenuItem>
            <MenuItem disabled={true}>Disabled MenuItem</MenuItem>
            <MenuItem disabled={false}>MenuItem</MenuItem>
        </Menu>
    )
}
VerticalMenu.args = {
    mode: 'vertical'
};
VerticalMenu.storyName = '垂直 Menu'

export const ExpandMenu: Story<MenuProps> = (args) => {
    return (
        <Menu {...args}>
            <MenuItem>MenuItem 1</MenuItem>
            <MenuItem>MenuItem 2</MenuItem>
            <SubMenu title="SubMenu">
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
                <MenuItem>Item 3</MenuItem>
            </SubMenu>
            <MenuItem>MenuItem 3</MenuItem>
        </Menu>
    )
}
ExpandMenu.args = {
    mode: 'vertical',
    defaultOpenSubMenus: ['2']
}
ExpandMenu.storyName = '默认展开垂直 Menu'
