import React from "react";

function Wait() {
  return (
    <div className="row">
      <div className="col-md-12">
        <img className="m-auto" src="/loading.svg" alt="page-loading" />
        <h2 className="meal-subtitle text-center">
          Please wait while we fulfill your request...
        </h2>
      </div>
    </div>
  );
}

export default Wait;
