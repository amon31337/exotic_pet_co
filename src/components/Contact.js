import React from 'react';

const Contact = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="display-4 mb-4">Contact Us</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-phone me-2"></i>
                    Phone
                  </h5>
                  <p className="card-text">(555) 123-EXOTIC</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-envelope me-2"></i>
                    Email
                  </h5>
                  <p className="card-text">info@exoticpetco.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Address
                  </h5>
                  <p className="card-text">
                    123 Exotic Street<br />
                    Pet City, PC 12345
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-clock me-2"></i>
                    Hours
                  </h5>
                  <p className="card-text">
                    Mon-Fri: 9AM-6PM<br />
                    Sat-Sun: 10AM-4PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
