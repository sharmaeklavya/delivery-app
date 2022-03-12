import React from "react";
import { Link } from "react-router-dom";

function Cancelled() {
  return (
    <div className="container text-center px-3 py-2">
      <div className="row vh-100 align-items-center">
        <div className="col">
          <h4 className="h4">Oops! Payment failed.</h4>
          <p className="lead">
            Sorry! We coudn't process your order this time. Please try again.
          </p>
          <Link to="/my-account">
            <button type="button" className="magenta-btn">
              Take me back to order page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cancelled;
