import React from 'react';
import { Link } from "react-router-dom";

function ContactUs() {
    return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Contact Exotic Pet Co.</h1>
          <p className="lead">
            General Queries: 
          </p>
          <p>
            Contact Benton Amon at benton.amon@exoticpetco.com
          </p>
          <p className="lead">
            Animal Care Queries:
          </p>
          <p>
            Contact Christian Blue at christian.blue@exoticpetco.com
          </p>
          <p className="lead">
            Return Queries: 
          </p>
          <p>
            First read our Refund/Return policy below and contact Ronald Liao at 
          </p>
          <p>
            ronald.liao@exoticpetco.com with additional questions.
          </p>
          <p className="lead">
            Refund/Return Policy:
          </p>
          <p>
All sales are final. We do not offer refunds or store credit for any purchases.
We understand that unique situations may arise, and in limited cases, we may accept the return of an animal under the following conditions:
Returns must be requested within 3 days of receiving the animal.
The animal must be in the same health and condition as when it was delivered or picked up.
The animal must not have been exposed to other animals or potentially harmful environments.
A safe and appropriate method of transport must be arranged and approved by us in advance. 
All return requests are subject to approval and must be coordinated through our team. 
Return shipping or delivery costs are the responsibility of the buyer. 
We do not accept returns due to personal preference, unexpected care requirements, or changes in circumstances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;