import React from 'react';
import { Story, Meta } from '@storybook/react';
import Menu,  { MenuProps } from './menu';
import MenuItem ,  { MenuItemProps } from './menuItem';
import SubMenu, { SubMenuProps } from './subMenu';

export default {
  title: 'Noah-Ark/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

export const EmptyMenuItem: Story<MenuItemProps> = (args) => <MenuItem {...args}>MenuItem</MenuItem>

export const DisabledMenuItem = EmptyMenuItem.bind({})
DisabledMenuItem.args = {
    disabled: true
}
export const EmptySubMenu: Story<SubMenuProps> = (args) => <SubMenu {...args} />

export const DefaultMenu: Story<MenuProps> = (args) => {
    return (
        <Menu {...args}>
            <MenuItem disabled={false}>MenuItem</MenuItem>
            <MenuItem disabled={true}>Disabled MenuItem</MenuItem>
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
ExpandMenu.storyName = '可展开 Menu'

// export const Link = Template.bind({});
// Link.args = {
//   btnType: 'link',
//   href: 'www.baidu.com'
// };
// Link.storyName = '链接 Button'

// export const BtnType:Story<ButtonProps> = () => {
//   return (
//     <>
//       <Button btnType="default">default</Button>
//       <Button btnType="primary">primary</Button>
//       <Button btnType="danger">danger</Button>
//       <Button btnType="link" href="www.baidu.com">danger</Button>
//     </>
//   )
// };
// BtnType.storyName = 'Button 类型'
