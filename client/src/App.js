import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Auth } from "./resuables/Auth";
import Protected from "./resuables/Proute";
import Account from "./components/Account";
import Success from "./components/Success";
import Cancelled from "./components/Cancelled";
import Settings from "./components/Settings";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Orders from "./components/Orders";

function App() {
  const [userLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await Auth.getToken();
      if (response) setLoggedIn(true);
      else setLoggedIn(false);
    })();
  }, []);

  return (
    <Router>
      <Switch>
        <Protected path="/my-account" component={Account} exact />
        <Protected path="/my-orders" component={Orders} exact />
        <Protected path="/my-settings" component={Settings} />
        <Protected path="/cancelled" component={Cancelled} exact />
        <Protected path="/success" component={Success} />
        <Route path="/sign-up" component={Signup} exact />
        <Route path="/sign-in" exact>
          {userLoggedIn ? <Redirect to="/my-account" /> : <Signin />}
        </Route>
        <Route path="/" exact>
          {userLoggedIn ? <Redirect to="/my-account" /> : <Home />}
        </Route>
        <Route path="*">
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
