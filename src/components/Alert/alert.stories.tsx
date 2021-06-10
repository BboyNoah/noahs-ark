import { Story, Meta } from '@storybook/react';
import Alert, { BaseAlertProps } from './alert';

export default {
  title: 'Noah-Ark/Alert',
  component: Alert,
} as Meta;

const Template: Story<BaseAlertProps> = (args) => <Alert {...args} />;

export const defaultAlert = Template.bind({})
defaultAlert.args = {
  title: 'default alert',
  type: 'default'
}
defaultAlert.storyName = '默认 Alert'

export const closableAlert = Template.bind({})
closableAlert.args = {
  title: 'closable alert',
  type: 'default',
  closable: false
}
closableAlert.storyName = '不可关闭 Alert'


export const descriptionAlert = Template.bind({})
descriptionAlert.args = {
  title: 'alert with description',
  description: 'this is a description',
  type: 'default'
}
descriptionAlert.storyName = '带描述 Alert'

export const AlertType:Story<BaseAlertProps> = () => {
  return (
    <>
      <Alert title="default" type="default" style={{margin: '5px'}} />
      <Alert title="danger" type="danger" style={{margin: '5px'}} />
      <Alert title="warning" type="warning" style={{margin: '5px'}} />
      <Alert title="success" type="success" style={{margin: '5px'}} />
      <Alert title="description" description="this is a description" type="default" style={{margin: '5px'}} />
      <Alert title="unclosable" type="default" closable={false} style={{margin: '5px'}} />
    </>
  )
};
AlertType.storyName = 'Alert 类型'