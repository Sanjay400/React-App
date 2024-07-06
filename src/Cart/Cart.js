// src/Cart/Cart.js

import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    const updatedCart = user.cart.filter(product => product.id !== productId);
    updateCart(updatedCart);
  };

  const handleIncrementQuantity = (productId) => {
    const updatedCart = user.cart.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: (product.quantity || 1) + 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleDecrementQuantity = (productId) => {
    const updatedCart = user.cart.map(product => {
      if (product.id === productId && (product.quantity || 1) > 1) {
        return { ...product, quantity: (product.quantity || 1) - 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    const updatedUser = { ...user, cart: updatedCart };

    axios.patch(`http://localhost:5000/users/${user.id}`, { cart: updatedCart })
      .then(() => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
  };

  const handleProceedToBuy = () => {
    // Handle proceed to buy logic here
    navigate('/shipping');
  };

  const total = user.cart.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0);

  return (
    <div className="cart-page">
      <header className="header">
        <div className="header-buttons">
          <Link to="/products">Products</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <h1>Cart</h1>
      {user.cart.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div className="cart-items">
          {user.cart.map(product => (
            <div key={product.id} className="cart-item">
              <img src={process.env.PUBLIC_URL + `/Image/${product.image}`} alt={product.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrementQuantity(product.id)}>-</button>
                  <span>{product.quantity || 1}</span>
                  <button onClick={() => handleIncrementQuantity(product.id)}>+</button>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
          <button onClick={handleProceedToBuy}>Proceed to Buy</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
