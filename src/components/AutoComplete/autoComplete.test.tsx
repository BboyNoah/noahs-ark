import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'
import { config } from 'react-transition-group'

config.disabled = true

const testArray = [
  {
    value: "mao",
    number: 1
  },
  {
    value: "deng",
    number: 2
  },
  {
    value: "xi",
    number: 3
  },
  {
    value: "weng",
    number: 4
  },
  {
    value: "jiang",
    number: 5
  },
  {
    value: "hu",
    number: 6
  },
  {
    value: "ye",
    number: 7
  },
  {
    value: "zhao",
    number: 8
  },
  {
    value: "wuhu",
    number: 9   
  }
]

const testProps:AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, {target: {value: 'eng'}})
    await waitFor(() => {
      expect(wrapper.queryByDisplayValue('eng')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    fireEvent.click(wrapper.getByText('deng'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'deng', number: 2 })
    expect(wrapper.queryByDisplayValue('eng')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('deng')
    
  })
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, {target: {value: 'en'}})
    await waitFor(() => {
      expect(wrapper.queryByDisplayValue('en')).toBeInTheDocument()
      const firstRes = wrapper.queryByText('deng')
      const secondRes = wrapper.queryByText('wend')
      fireEvent.keyDown(inputNode, { keycode: 40 })
      expect(firstRes).toHaveClass('is-active')

      // expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
      // fireEvent.click(wrapper.getByText('deng'))
      // expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'deng', number: 2 })
      // expect(wrapper.queryByDisplayValue('eng')).not.toBeInTheDocument()
      // expect(inputNode.value).toBe('deng')
    })
  })
  it('click outside should hide the dropdown', () => {
    
  })
  it('renderOption should generate the right template', () => {
    
  })
  it('async fetchSuggestions should works fine', () => {
    
  })

})