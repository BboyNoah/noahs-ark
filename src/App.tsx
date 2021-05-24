import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'

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
    </div>
  );
}

export default App;
