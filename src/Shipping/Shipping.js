// src/Shipping/Shipping.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import './Shipping.css';

const Shipping = () => {
  const { user, placeOrder } = useContext(AuthContext);
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    phone: '',
    email: user ? user.email : '',
    payment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(shippingDetails);
    alert('Order placed successfully!');
    navigate('/order-history');
  };

  return (
    <div className="shipping-page">
      <header className="header">
        <div className="header-buttons">
          <button onClick={() => navigate('/order-history')}>Order History</button>
          <button onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}>Logout</button>
        </div>
      </header>
      <form className="shipping-form" onSubmit={handleSubmit}>
        <h2>Shipping Details</h2>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={shippingDetails.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={shippingDetails.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={shippingDetails.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Payment Method:</label>
          <select name="payment" value={shippingDetails.payment} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Shipping;
