import React from "react";
import Header from "./Header";

function Orders() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Header />
        </div>
        <div className="col-md-12">
          <section className="text-center px-3 py-2">
            Orders being updated...
          </section>
        </div>
      </div>
    </div>
  );
}

export default Orders;
