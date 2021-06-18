import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { config } from 'react-transition-group'
import Select, { SelectProps } from "./select";
import Option from "./option";

config.disabled = true

const defaultProps: SelectProps = {
  placeholder: 'defaultProps',
  onChange: jest.fn(),
  onVisibleChange: jest.fn()
}

const disabledProps: SelectProps = {
  disabled: true,
  placeholder: 'disabledProps'
}

const multipleProps: SelectProps = {
  multiple: true,
  placeholder: 'multipleProps',
  defaultValue: '1',
  onChange: jest.fn(),
}

const generateSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <Option value="1" label="option 1" />
      <Option value="2" label="disabled option 2" disabled />
      <Option value="3" label="option 3" />
      <Option value="4" label="option 4" />
    </Select>
  )
}

describe('test Select component', () => {
  it('should render a select with placeholder , onChange cb, onVisibleChange cb', async () => {
    const wrapper = render(generateSelect(defaultProps))
    const inputNode = wrapper.getByPlaceholderText('defaultProps')
    expect(inputNode).toBeInTheDocument()
    fireEvent.focus(inputNode)
    const firstOption = await wrapper.findByText('option 1')
    expect(firstOption).toBeInTheDocument()
    fireEvent.click(firstOption)
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(true)
    expect(defaultProps.onChange).toHaveBeenCalledWith('1', ['1'])
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(false)
    fireEvent.focus(inputNode)
    const diabledOption = wrapper.getByText('disabled option 2')
    expect(diabledOption).toBeInTheDocument()
    fireEvent.click(diabledOption)
    expect(defaultProps.onChange).not.toHaveBeenCalledWith('2', ['2'])
  })

  it('should render a disabled select ', async () => {
    const wrapper = render(generateSelect(disabledProps))
    const inputNode = wrapper.getByPlaceholderText('disabledProps')
    expect(inputNode).toBeInTheDocument()
    expect(inputNode).toBeDisabled()
    fireEvent.click(inputNode)
    expect(defaultProps.onVisibleChange).not.toHaveBeenCalledWith(true)
  })
  it('should render a multiple select with defaultValue', async () => {
    cleanup()
    const wrapper = render(generateSelect(multipleProps))
    const inputNode = wrapper.getByPlaceholderText('multipleProps')
    expect(inputNode).toBeInTheDocument()
    fireEvent.focus(inputNode)
    const thirdOption = await wrapper.findByText('option 3')
    expect(thirdOption).toBeInTheDocument()
    fireEvent.click(thirdOption)
    expect(multipleProps.onChange).toHaveBeenCalledWith('3', ['1','3'])
  })
})