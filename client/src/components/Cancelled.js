import React from "react";
import { Link } from "react-router-dom";

function Cancelled() {
  return (
    <div className="px-3 py-2">
      <h3 className="h3">Oops! Payment failed.</h3>
      <p className="lead">
        We coudn't process your order this time. Please try again.
      </p>
      <Link to="/my-account">
        <button type="button" className="magenta-btn">
          Take me back to order page
        </button>
      </Link>
    </div>
  );
}

export default Cancelled;
