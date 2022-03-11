import React from "react";

const Footer = () => {
  return (
    <footer className="footer px-3 py-2">
      <div className="d-flex justify-content-between">
        <hr className="straight-line" />
        <h5 className="section-title text-right text-light">
          Terms &amp; conditions
        </h5>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <h5 className="meal-subtitle text-center text-light">
            All prices are tax included. @2022
          </h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
