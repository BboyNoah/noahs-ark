import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import Alert, { BaseAlertProps } from './alert'

const defaultProps: BaseAlertProps = {
  title: 'default Alert',
  onClose: jest.fn()
}

const anotherProps: BaseAlertProps = {
  title: 'unclosable Alert',
  type: "danger",
  description: 'description',
  closable: false
}


describe('test Alert component', () => {
  it('should render a default Alert', () => {
    const wrapper = render(<Alert {...defaultProps} />)
    const element = wrapper.getByTestId('test-alert-id') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert alert-default')
    expect(wrapper.container.querySelector('.alert-close-btn')).toBeInTheDocument()
    const closeBtn = wrapper.container.querySelector('.alert-close-btn')
    fireEvent.click(closeBtn as Element)
    expect(defaultProps.onClose).toHaveBeenCalled()
    waitFor(() => {
      expect(element).not.toBeInTheDocument()
    })
  })

  it('should render a unclosable Alert and it has danger type and it has description', () => {
    cleanup()
    const wrapper = render(<Alert {...anotherProps} />)
    const element = wrapper.getByTestId('test-alert-id') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert alert-danger')
    expect(wrapper.getByText('description')).toBeInTheDocument()
    expect(wrapper.container.querySelector('.alert-close-btn')).not.toBeInTheDocument()
  })
})