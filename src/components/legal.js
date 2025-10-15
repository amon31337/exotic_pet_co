import React from 'react';

const Legal = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="display-4 mb-4">Legal Information</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Terms of Service</h5>
              <p className="card-text">
                By using Exotic Pet Co., you agree to our terms of service. 
                Please ensure you comply with all local laws and regulations 
                regarding exotic pet ownership.
              </p>
              
              <h5 className="card-title mt-4">Privacy Policy</h5>
              <p className="card-text">
                We respect your privacy and are committed to protecting your 
                personal information. Your data is secure with us.
              </p>
              
              <h5 className="card-title mt-4">Disclaimer</h5>
              <p className="card-text">
                Exotic pets require special care and attention. Please research 
                thoroughly before making a purchase and ensure you can provide 
                proper care for your chosen pet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
