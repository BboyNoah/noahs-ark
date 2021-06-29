import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'
import { config } from 'react-transition-group'

config.disabled = true

const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]

const testProps:AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const renderOptionProps:AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  placeholder: 'render option autoComplete',
  renderOption: item => <b>value值：{item.value}</b>
}


const asyncOptionProps:AutoCompleteProps = {
  //fetchSuggestions: (query) => {return Promise.resolve(testArray.filter(item => item.value.includes(query)))},
  fetchSuggestions: jest.fn((query) => {return Promise.resolve(testArray.filter(item => item.value.includes(query)))}),
  onSelect: jest.fn(),
  placeholder: 'async auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
    
  })
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstRes = wrapper.queryByText('ab')
    const secondRes = wrapper.queryByText('abc')
    // 由于键盘事件绑定时是通过 e.key 来判定的，所以fireEvent.keyDown 绑定的为key
    // 但是为了同时兼容到可能的其他情况，则把 code keyCode charCode 都加上了
    fireEvent.keyDown(inputNode, { 
      key: "ArrowDown",
      code: "ArrowDown",
      keyCode: 40,
      charCode: 40
    })
    expect(firstRes).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, { 
      key: "ArrowDown",
      code: "ArrowDown",
      keyCode: 40,
      charCode: 40
    })
    expect(secondRes).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, { 
      key: "ArrowUp",
      code: "ArrowUp",
      keyCode: 38,
      charCode: 38
    })
    expect(firstRes).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, { 
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13
    })
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')

    fireEvent.change(inputNode, {target: {value: 'b'}})
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })

    fireEvent.keyDown(inputNode, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', async () => {
    cleanup()
    const wrapper = render(<AutoComplete {...renderOptionProps} />)
    const inputNode = wrapper.getByPlaceholderText('render option autoComplete') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await waitFor(() => {
      expect(wrapper.queryByText('value值：ab')).toBeInTheDocument()
    })
    
  })
  it('async fetchSuggestions should works fine', async () => {
    cleanup()
    const wrapper = render(<AutoComplete {...asyncOptionProps}/>)
    const inputNode = wrapper.getByPlaceholderText('async auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, {target: { value: 'a'}})
    waitFor(() => {
        expect(asyncOptionProps.fetchSuggestions).toHaveBeenCalled()
    })
    waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
  })

})