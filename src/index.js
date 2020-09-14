import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Character from "./components/Character";
import Location from "./components/Location";
import Episode from "./components/Episode";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route path={["/", "/page=:id"]} exact>
          <App />
        </Route>
        <Route path="/character/:id" exact>
          <Character />
        </Route>
        <Route path="/location/:id" exact>
          <Location />
        </Route>
        <Route path="/episode/:id" exact>
          <Episode />
        </Route>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
