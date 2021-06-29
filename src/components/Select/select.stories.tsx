import React from 'react';
import { Story, Meta } from '@storybook/react';
import Select,  { SelectProps } from './select';
import Option from './option';


export default {
  title: 'Noah-Ark/Select',
  component: Select,
  subcomponents: { Option },
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

const Template: Story<SelectProps> = (args) => {
  return (
    <Select {...args}>
      <Option value="1" label="option 1" />
      <Option value="2" label="option 2" />
      <Option value="3" label="option 3" />
      <Option value="4" label="option 4" />
    </Select>
  )
};

export const DefaulSelect = Template.bind({});
DefaulSelect.args = {
  placeholder: '默认 Select'
}

DefaulSelect.storyName = "默认 Select"

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  multiple: true,
  placeholder: '多选 Select'
}

MultipleSelect.storyName = "多选 Select"

const SelectWithDefaultValue:SelectProps  = {
  defaultValue: '1'
}

const MultipleSelectWithDefaultValue:SelectProps = {
  multiple: true,
  defaultValue: ['1', '2']
}

export const WithDefaultValue = () => {
  return (
    <>
      <Select {...SelectWithDefaultValue} >
        <Option value="1" label="option 1" />
        <Option value="2" label="option 2" />
        <Option value="3" label="option 3" />
        <Option value="4" label="option 4" />
      </Select>
      <Select {...MultipleSelectWithDefaultValue} >
        <Option value="1" label="option 1" />
        <Option value="2" label="option 2" />
        <Option value="3" label="option 3" />
        <Option value="4" label="option 4" />
      </Select>
    </>
  )
}

WithDefaultValue.storyName = "带默认值 Select"