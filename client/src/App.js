import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Protected from "./resuables/Proute";
import Account from "./components/Account";
import Payment from "./components/Payment";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Canceled from "./components/Canceled";
import Orders from "./components/Orders";

function App() {
  return (
    <Router>
      <Switch>
        <Protected path="/my-account" component={Account} exact />
        <Protected path="/my-orders" component={Orders} exact />
        <Route path="/success" component={Payment} exact />
        <Route path="canceled" component={Canceled} />
        <Route path="/sign-up" exact>
          {localStorage.getItem("__SSID") ? (
            <Redirect to="/my-account" />
          ) : (
            <Signup />
          )}
        </Route>
        <Route path="/sign-in" exact>
          {localStorage.getItem("__SSID") ? (
            <Redirect to="/my-account" />
          ) : (
            <Signin />
          )}
        </Route>
        <Route path="/" exact>
          {localStorage.getItem("__SSID") ? (
            <Redirect to="/my-account" />
          ) : (
            <Home />
          )}
        </Route>
        <Route>
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <p className="lead"> 404 Page not found</p>
              <button className="btn">
                <Link to="/">Take me back</Link>
              </button>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
