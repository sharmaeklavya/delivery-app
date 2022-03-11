import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
        <Route path="/sign-up" component={Signup} exact />
        <Route path="/sign-in" component={Signin} exact />
        <Route path="/success" component={Payment} exact />
        <Route path="canceled" component={Canceled} />
        <Route path="/" component={Home} exact />
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
