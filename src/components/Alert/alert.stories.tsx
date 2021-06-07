import { Story, Meta } from '@storybook/react';
import Alert, { BaseAlertProps } from './alert';

export default {
  title: 'Example/Alert',
  component: Alert,
} as Meta;

const Template: Story<BaseAlertProps> = (args) => <Alert {...args} />;

export const defaultAlert = Template.bind({})
defaultAlert.args = {
  type: 'default'
}

