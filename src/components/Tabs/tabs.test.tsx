import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";

const defaultProps:TabsProps = {
  onSelect: jest.fn()
}

const borderProps:TabsProps = {
  mode: 'border',
  defaultIndex: 2
}

const generateTab = (args: TabsProps) => {
  return (
    <Tabs {...args}>
      <TabItem label={<div className="test-element">element tab item</div>}>element tab item content</TabItem>
      <TabItem label="disabled item" disabled>disabled item content</TabItem>
      <TabItem label="tab item">tab item content</TabItem>
    </Tabs>
  )
}

describe('test Tabs component', () => {
  it('should render a default Tabs with onSelect cb, element label tabItem, and disabled tabItem', () => {
    const wrapper = render(generateTab(defaultProps))
    const itemNodeArr = wrapper.container.querySelectorAll('.ark-tab-item-label')
    expect(itemNodeArr.length).toEqual(3)
    const firstNode = itemNodeArr[0]
    const secondNode = itemNodeArr[1]
    const thirdNode = itemNodeArr[2]
    expect(firstNode).toHaveClass('is-tab-active')
    expect(wrapper.getByText('element tab item')).toHaveClass('test-element')
    expect(wrapper.getByText('element tab item content')).toBeInTheDocument()
    expect(secondNode).toHaveClass('is-tab-diabled')
    fireEvent.click(secondNode)
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith(1)
    fireEvent.click(thirdNode)
    expect(defaultProps.onSelect).toHaveBeenCalledWith(2)
    expect(wrapper.getByText('tab item content')).toBeInTheDocument()
  })

  it('should render a border mode Tabs', () => {
    cleanup()
    const wrapper = render(generateTab(borderProps))
    expect(wrapper.container.querySelector('.ark-tabs-header')).toHaveClass('tabs-border')
    const itemNodeArr = wrapper.container.querySelectorAll('.ark-tab-item-label')
    const thirdNode = itemNodeArr[2]
    expect(thirdNode).toHaveClass('is-tab-active')
    expect(wrapper.getByText('tab item content')).toBeInTheDocument()
  })
})