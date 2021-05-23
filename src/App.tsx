import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button> hello </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> hello </Button>
      <Button btnType={ButtonType.Danger} disabled size={ButtonSize.Small}> danger </Button>
      <Button btnType={ButtonType.Link} href="http://baidu.com"> baidu link </Button>
      <Button> hello </Button>
    </div>
  );
}

export default App;
