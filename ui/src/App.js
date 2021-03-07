import './App.css';
import styles from './styles';
// import 'semantic-ui-css/semantic.min.css';
import { ListPage } from './components/Home';
import {LoginPage} from './components/Login';

import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  const isAuth = localStorage.getItem('user_data');
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={() => {
            if (!isAuth)
              return <LoginPage />
            else {
              return <ListPage />
            }
          }}></Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
