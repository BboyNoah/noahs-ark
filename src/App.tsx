import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MemuItem from './components/Menu/menuItem'
function App() {
  const alertStyleObj = {
    margin: '5px'
  }
  return (
    <div className="App">
      <div>
        <Button> hello </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> hello </Button>
        <Button btnType={ButtonType.Danger}> danger </Button>
        <Button btnType={ButtonType.Danger} disabled size={ButtonSize.Small}> danger </Button>
        <Button btnType={ButtonType.Link} href="http://baidu.com"> baidu link </Button>
        <Button btnType={ButtonType.Link} href="http://baidu.com" disabled> baidu link </Button>
        <Button> hello </Button>
      </div>
      <hr />
      <div>
        <Alert
          title="this is a alert"
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          type={AlertType.Success}
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          type={AlertType.Danger}
          style={alertStyleObj}
        />
        <Alert
          title="this is a alert"
          type={AlertType.Warning}
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
          <MemuItem index={0}>
            item 1
          </MemuItem>
          <MemuItem>
            item 2
          </MemuItem>
          <MemuItem disabled>
            link 3
          </MemuItem>
          <MemuItem>
            item 4
          </MemuItem>
        </Menu>
        <Menu mode='vertical' style={{marginLeft: '30px'}} onSelect={(index) => {console.log(index)}}>
          <MemuItem>
            item 1
          </MemuItem>
          <MemuItem>
            item 2
          </MemuItem>
          <MemuItem disabled>
            link 3
          </MemuItem>
          <MemuItem>
            item 4
          </MemuItem>
        </Menu>
      </div>
    </div>
  );
}

export default App;
