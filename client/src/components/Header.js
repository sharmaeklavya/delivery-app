import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import baseApi from "../apis/baseApi";

const Header = () => {
  const history = useHistory();
  const validUser = useSelector((state) => state.validUsers.user);
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    if (validUser) {
      const accountInfo = decode(validUser.refreshToken);
      setUser({
        id: accountInfo._id,
        firstName: accountInfo.firstName,
        lastName: accountInfo.lastName,
        email: accountInfo.email,
      });
    }
  }, [validUser]);

  const handleLogout = async () => {
    try {
      const res = await baseApi.post("api/auth/logout", { id: user.id });
      if (res.data) {
        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <header className="mb-3">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="logo">
          <img src="/logo.png" alt="pizza delivery logo" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {!validUser ? (
              <>
                <li className="nav-item my-1">
                  <Link to="/sign-up">
                    <button
                      className="darkBrown-btn rounded-sm shadow-lg mx-2 my-2 my-sm-0"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </Link>
                </li>
                <li className="nav-item my-1">
                  <Link to="/sign-in">
                    <button
                      className="magenta-btn rounded-sm shadow-lg mx-2 my-2 my-sm-0"
                      type="button"
                    >
                      Sign In
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item my-1 dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle darkBrown-btn rounded-sm shadow-lg m-2 my-sm-0"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.firstName.charAt(0).toUpperCase() +
                      user.firstName.slice(1)}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/my-orders">
                      <button type="button" className="dropdown-item">
                        My Orders
                      </button>
                    </Link>
                    <Link to="/my-settings">
                      <div className="dropdown-divider"></div>
                      <button type="button" className="dropdown-item">
                        My Settings
                      </button>
                    </Link>
                  </div>
                </li>
                <li className="nav-item my-1">
                  <Link to="/" onClick={handleLogout}>
                    <button
                      className="magenta-btn rounded-sm shadow-lg m-2 my-sm-0"
                      type="button"
                    >
                      Sign out
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
