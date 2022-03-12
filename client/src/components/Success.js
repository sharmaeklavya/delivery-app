import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Success() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Header />
        </div>
        <div className="col-md-12">
          <section className="text-center px-3 py-2">
            <h4 className="h4">Thank you for your payment!</h4>
            <p className="lead">We shall process your order shortly.</p>
            <Link to="/my-account">
              <button type="button" className="magenta-btn">
                Go back to home or Click to order more
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Success;
