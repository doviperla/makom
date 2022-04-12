import './App.css';
import styles from './styles';
// import 'semantic-ui-css/semantic.min.css';
import { ListPage } from './components/Home';
import { LoginPage } from './components/Login';
import { MapPage } from './components/Map';
import { NMapPage } from './components/NMap';

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
          <Route path="/list" component={() => {
            if (!isAuth)
              return <LoginPage />
            else {
              return <ListPage />
            }
          }}></Route>
          <Route path="/map" component={() => {
            if (!isAuth)
              return <LoginPage />
            else {
              return <MapPage />
            }
          }}></Route>
          <Route path="/" component={() => {
            if (!isAuth)
              return <LoginPage />
            else {
              return <NMapPage />
            }
          }}></Route>
          <Route path="/login" component={() => {
            return <LoginPage />
          }}></Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
