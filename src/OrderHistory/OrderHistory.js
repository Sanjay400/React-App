// src/OrderHistory/OrderHistory.js

import React, { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const { user, cancelOrder } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user || user.orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="order-history-page">
      <header className="header">
        <div className="header-buttons">
          <button onClick={() => navigate('/products')}>Products</button>
          <button onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}>Logout</button>
        </div>
      </header>
      <div className="orders">
        {user.orders.map((order, index) => (
          <div key={index} className="order">
            <h3>Order {index + 1}</h3>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
            <div className="products">
              {order.cart.map(product => (
                <div key={product.id} className="product">
                  <img src={process.env.PUBLIC_URL + `/Image/${product.image}`} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <p>{product.name}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>Shipping Address: {order.shippingDetails.address}</p>
            <p>Phone: {order.shippingDetails.phone}</p>
            <p>Email: {order.shippingDetails.email}</p>
            <p>Payment Method: {order.shippingDetails.payment}</p>
            <button onClick={() => cancelOrder(index)}>Cancel Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
