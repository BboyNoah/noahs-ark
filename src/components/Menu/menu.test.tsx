import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        default
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

// 测试文件中没有引入样式，所以手写简单的下拉显示隐藏样式用于测试
const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-open {
      display: block;
    }
  `
  const styleDom = document.createElement('style')
  // styleDom.type = 'text/css'
  styleDom.innerHTML = cssFile
  return styleDom
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu-id')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('ark-menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('ark-menu-item is-active')
    expect(disabledElement).toHaveClass('ark-menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const item3 = wrapper.getByText('default')
    fireEvent.click(item3)
    expect(item3).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertival', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const verElement = wrapper.getByTestId('test-menu-id')
    expect(verElement).toHaveClass('ark-menu menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})