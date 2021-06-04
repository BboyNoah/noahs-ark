import { Story, Meta } from '@storybook/react';

import Button,  { ButtonProps } from './button';

export default {
  title: 'Example/My-Button',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} ></Button>;

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary'
};