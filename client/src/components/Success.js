import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="container text-center px-3 py-2">
      <div className="row vh-100 align-items-center">
        <div className="col">
          <h4 className="h4">Thank you for your payment</h4>
          <p className="lead">We shall process your order shortly.</p>
          <Link to="/my-account">
            <button type="button" className="magenta-btn">
              Go back to home or Click to order more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
