import React from "react";
import Header from "./Header";

function Settings() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Header />
        </div>
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <hr className="straight-line" />
            <h5 className="section-title text-right">My Settings</h5>
          </div>
        </div>
        <div className="col-md-12">
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <p className="lead"> User setting shall be updated soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
