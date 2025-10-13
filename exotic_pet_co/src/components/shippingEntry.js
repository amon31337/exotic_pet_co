import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { ShippingContext } from '../context/ShippingContext';

function ShippingEntry() {
  const navigate = useNavigate();
  const { setShippingData } = useContext(ShippingContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let newInfo = {
      firstName: firstName,
      lastName: lastName,
      addressLine1: addressLine1,
      addressLine2: addressLine2, 
      city: city,
      state: state,
      zip: zip
    }
    setShippingData(newInfo);
    console.log('Form data:', { firstName, lastName, addressLine1, addressLine2, city, state, zip });
    navigate('/purchase/viewOrder');
  };

  return (
    <div className="container mt-4">
      <h2>Enter Shipping Details:</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>

        <div className="mb-1">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>

        <div className="mb-1">
          <label className="form-label">Address Line 1</label>
          <input
            type="text"
            className="form-control"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        <div className="mb-1">
          <label className="form-label">Address Line 2</label>
          <input
            type="text"
            className="form-control"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        <div className="mb-1">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
          />
        </div>

        <div className="mb-1">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter your state"
          />
        </div>

        <div className="mb-1">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter your zip code"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default ShippingEntry;