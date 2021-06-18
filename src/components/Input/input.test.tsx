import { render, fireEvent } from '@testing-library/react'
import Input, { InputProps } from './input'

const simpleProps: InputProps = {
  size: 'lg',
  onChange: jest.fn(),
  placeholder: 'simpleProps'
}

const disabledIconProps: InputProps = {
  disabled: true,
  icon: 'check',
  placeholder: 'disabledIconProps'
}

const preAndAppendProps: InputProps = {
  prepend: 'prepend',
  append: 'append',
  placeholder: 'preAndAppendProps'
}

describe('test Input component', () => {
  it('should render a large size input with onChange callback', () => {
    const wrapper = render(<Input {...simpleProps} />)
    const inputNode = wrapper.getByPlaceholderText('simpleProps')
    expect(inputNode).toBeInTheDocument()
    expect(wrapper.container.querySelector('.input-size-lg')).toBeInTheDocument()
    fireEvent.change(inputNode, {target: { value: 'ab'}})
    expect(simpleProps.onChange).toHaveBeenCalled()
  })

  it('should render a disabled input with icon', () => {
    const wrapper = render(<Input {...disabledIconProps} />)
    const inputNode = wrapper.getByPlaceholderText('disabledIconProps')
    expect(inputNode).toBeInTheDocument()
    expect(inputNode).toBeDisabled()
    expect(wrapper.container.querySelector('.icon-wrapper')).toBeInTheDocument()
  })

  it('should render a input with prepend and append', () => {
    const wrapper = render(<Input {...preAndAppendProps} />)
    const inputNode = wrapper.getByPlaceholderText('preAndAppendProps')
    expect(inputNode).toBeInTheDocument()
    const prependNode = wrapper.getByText('prepend')
    const appendNode = wrapper.getByText('append')
    expect(prependNode).toBeInTheDocument()
    expect(appendNode).toBeInTheDocument()
  })
})