import logo from './logo.svg';
import './App.css';
import PuntoA from './pages/PuntoA';
import PuntoB from './pages/PuntoB';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
      <Router>
      <div className="App">
      <nav>
          <ul>
            <li>
              <Link to="/PuntoA">Punto A</Link>
            </li>
            <li>
              <Link to="/PuntoBC">Punto B y C</Link>
            </li>
          </ul>
      </nav>
      <Switch>
          <Route path="/PuntoBC">
            <PuntoB />
          </Route>
          <Route path="/PuntoA">
            <PuntoA />
          </Route>
          <Route path="/">
            <PuntoA />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
