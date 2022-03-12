import React, { useState, useEffect } from "react";
import Header from "./Header";
import baseApi from "../apis/baseApi";

function Orders() {
  const [orderList, setOrderList] = useState([]);

  const handleAuth = async () => {
    try {
      const tokenRes = await baseApi.post("api/auth/refreshtoken", {});
      if (tokenRes) {
        const orders = await baseApi.post(
          "api/orders/userorders",
          {},
          { headers: { authorization: `Bearer ${tokenRes.data.refreshToken}` } }
        );
        setOrderList(orders.data);
      } else setOrderList([]);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Header />
        </div>
        <div className="col-md-12">
          <section className="px-3 py-2">
            <div className="row">
              <div className="col-md-3">
                <h5 className="lead">Order Id</h5>
              </div>
              <div className="col-md-3">
                <h5 className="lead">Order Date</h5>
              </div>
              <div className="col-md-3">
                <h5 className="lead">Status</h5>
              </div>
              <div className="col-md-3">
                <h5 className="lead">Paid?</h5>
              </div>
            </div>
            {orderList.map((order) => (
              <div className="row">
                <div className="col-md-3">
                  <h5 className="h6">{order.orderId}</h5>
                </div>
                <div className="col-md-3">
                  <h5 className="h6">{order.orderDate.split("T")[0]}</h5>
                </div>
                <div className="col-md-3">
                  <h5 className="h6">{order.deliveryStatus}</h5>
                </div>
                <div className="col-md-3">
                  <h5 className="h6">{order.orderPaid}</h5>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Orders;
