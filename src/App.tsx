import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MemuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'

function App() {
  const alertStyleObj = {
    margin: '5px'
  }
  const fn = () => {
    return (
      <Alert
        title="测试"
        type="warning"
        onClose={() => {alert(123)}}
        style={alertStyleObj}
      />
    )
  }
  return (
    <div className="App">
      <div>
        <Button> hello </Button>
        <Button btnType="primary" size="lg"> hello </Button>
        <Button btnType="danger" > danger </Button>
        <Button btnType="danger" disabled size="sm"> danger </Button>
        <Button btnType="link" href="http://baidu.com"> baidu link </Button>
        <Button btnType="link" href="http://baidu.com" disabled> baidu link </Button>
        <Button onClick={() => {
          fn()
        }}> hello </Button>
      </div>
      <hr />
      <div>
        <Alert
          title="this is a alert"
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          type="success"
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          type="danger"
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          type="warning"
          onClose={() => {alert(123)}}
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          closable={false}
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          description="this is description"
          style={alertStyleObj}
        />
      </div>
      <hr />
      <div>
        <Menu onSelect={(index) => {console.log(index)}}>
          <MemuItem>
            item 1
          </MemuItem>
          <MemuItem>
            item 2
          </MemuItem>
          <MemuItem disabled>
            link 3
          </MemuItem>
          <SubMenu title="dropdown">
            <MemuItem>
              subitem 1
            </MemuItem>
            <MemuItem>
              subitem 2
            </MemuItem>
            <MemuItem>
              subitem 3
            </MemuItem>
          </SubMenu>
          <MemuItem>
            item 4
          </MemuItem>
        </Menu>
        <Menu mode='vertical' defaultOpenSubMenus={['3']} style={{marginLeft: '30px'}} onSelect={(index) => {console.log(index)}}>
          <MemuItem>
            item 1
          </MemuItem>
          <MemuItem>
            item 2
          </MemuItem>
          <MemuItem disabled>
            link 3
          </MemuItem>
          <SubMenu title="dropdown">
            <MemuItem>
              subitem 1
            </MemuItem>
            <MemuItem>
              subitem 2
            </MemuItem>
            <MemuItem>
              subitem 3
            </MemuItem>
          </SubMenu>
          <MemuItem>
            item 4
          </MemuItem>
        </Menu>
      </div>
      <hr />
      <div>
        <Tabs>
          <TabItem label={<div>bbb</div>}>123</TabItem>
          <TabItem label="test" disabled>456</TabItem>
          <TabItem label="test">789</TabItem>
        </Tabs>

        <Tabs mode="border">
          <TabItem label={<div>bbb</div>} disabled>123</TabItem>
          <TabItem label="test">456</TabItem>
          <TabItem label="test">789</TabItem>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
