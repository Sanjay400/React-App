// src/Auth/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = (username, email, password, phone) => {
    const newUser = { username, email, password, phone, cart: [], orders: [] };
    axios.post('http://localhost:5000/users', newUser)
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/products');
      });
  };

  const login = (email, password) => {
    axios.get(`http://localhost:5000/users?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data.length > 0) {
          setUser(response.data[0]);
          localStorage.setItem('user', JSON.stringify(response.data[0]));
          navigate('/products');
        } else {
          alert('Invalid email or password');
        }
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const addToCart = (product) => {
    if (user) {
      const updatedUser = { ...user, cart: [...user.cart, product] };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
    }
  };

  const removeFromCart = (productId) => {
    if (user) {
      const updatedCart = user.cart.filter(product => product.id !== productId);
      const updatedUser = { ...user, cart: updatedCart };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
    }
  };

  const placeOrder = (shippingDetails) => {
    if (user) {
      const orderDate = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(orderDate.getDate() + 5);
      const newOrder = {
        cart: user.cart,
        shippingDetails,
        orderDate,
        deliveryDate,
      };
      const updatedUser = { ...user, orders: [...user.orders, newOrder], cart: [] };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
    }
  };

  const cancelOrder = (orderIndex) => {
    if (user) {
      const updatedOrders = user.orders.filter((_, index) => index !== orderIndex);
      const updatedUser = { ...user, orders: updatedOrders };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, addToCart, removeFromCart, placeOrder, cancelOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
