import { HashRouter as Router,Switch } from "react-router-dom";
import RoutingGuard from './router/RoutingGuard.js';
import router from './router/router.js';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
  return (
    <div className="App">
      <div className="myLoading">
        <LoadingOutlined style={{fontSize: '30px'}} />
      </div>
      <Router>
        <Switch>
          <RoutingGuard routerList={router}></RoutingGuard>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
