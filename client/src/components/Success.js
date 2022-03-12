import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="px-3 py-2">
      <h3 className="h3">Thank you for the payment</h3>
      <p className="lead">We shall process your order shortly.</p>
      <Link to="/my-account">
        <button type="button" className="magenta-btn">
          Forgot something? Click to order more
        </button>
      </Link>
    </div>
  );
}

export default Success;
